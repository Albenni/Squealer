const mongoose = require("mongoose");
const User = require("../models/User");
const Squeal = require("../models/Squeal");
const Reaction = require("../models/Reaction");
const constants = require("../config/constants");

const searchSqueal = async (req, res) => {
  if (!req.authorized) return res.sendStatus(403);
  if (!req.isMod) return res.sendStatus(403);

  const squeals = await Squeal.find({})
    .populate("author", "username firstname surname ")
    .populate("receivers.group", "name private editorialChannel profilePic");

  if (!squeals?.length)
    return res.status(204).json({ message: "No squeals found" });
  res.status(200).json(squeals);
};

//solo quelli pubblici
const getAllSquealsByUser = async (req, res) => {
  const squealLengthBlock = 10; //numero di squeal ritornati ad ogni richiesta
  let index = 0;
  if (!isNaN(req?.query?.index)) {
    index = parseInt(req.query.index);
  }
  if (!mongoose.Types.ObjectId.isValid(req?.params?.userId))
    return res.status(400).json({ message: "Invalid user ID" });

  const squeals = await Squeal.find({
    author: req.params.userId,
    publicSqueal: true,
  })
    .skip(squealLengthBlock * index)
    .limit(squealLengthBlock * (index + 1))
    .exec();

  squeals.map((squeal) => {
    squeal.impression += 1;
    squeal.save();
  });
  if (!squeals?.length)
    return res.status(204).json({ message: "No squeals found" });

  res.json(squeals);
};

const getAllSquealsInChannel = async (req, res) => {
  const squealLengthBlock = 10; //numero di squeal ritornati ad ogni richiesta
  let index = 0;
  if (!isNaN(req?.query?.index)) {
    index = parseInt(req.query.index);
  }
  if (!mongoose.Types.ObjectId.isValid(req?.params?.channelId))
    return res.status(400).json({ message: "Invalid channel ID" });

  // group: req.params.channelId,
  const squeals = await Squeal.find({
    "receivers.group": req.params.channelId,
    publicSqueal: false,
  })
    .skip(squealLengthBlock * index)
    .limit(squealLengthBlock * (index + 1))
    .exec();

  squeals.map((squeal) => {
    squeal.impression += 1;
    squeal.save();
  });
  if (!squeals?.length) {
    return res.status(204).json({ message: "No squeals found" });
  }

  res.json(squeals);
};

const getAllSquealsInKeyword = async (req, res) => {
  const squealLengthBlock = 10; //numero di squeal ritornati ad ogni richiesta
  let index = 0;
  if (!isNaN(req?.query?.index)) {
    index = parseInt(req.query.index);
  }
  if (!mongoose.Types.ObjectId.isValid(req?.params?.keywordId))
    return res.status(400).json({ message: "Invalid keyword ID" });

  const squeals = await Squeal.find({
    "receivers.group": req.params.keywordId,
    publicSqueal: false,
  })
    .skip(squealLengthBlock * index)
    .limit(squealLengthBlock * (index + 1))
    .exec();

  squeals.map((squeal) => {
    squeal.impression += 1;
    squeal.save();
  });
  if (!squeals?.length) {
    return res.status(204).json({ message: "No squeals found" });
  }

  res.json(squeals);
};

//il nome del campo del file (image o video) deve essere "squeal"
//il campo content può essere omesso solo se è stato caricato un file
// video e immagini sono salvate con nome = ID dello squeal + extension
const createSqueal = async (req, res) => {
  if (!req.authorized) return res.sendStatus(403);

  const { content, contentType, publicSqueal } = req.body;
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId))
    return res.status(400).json({ message: "Author ID not valid" });
  if (!content && !req.files)
    return res.status(400).json({ message: "Body message required" });
  if (!contentType)
    return res.status(400).json({ message: "Content type required" });
  // if (!req.body?.squealType)
  //   return res.status(400).json({ message: "Squeal type required" });

  if (!publicSqueal)
    if (
      !req.body?.receivers?.map((item) => {
        console.log(item);
        return mongoose.Types.ObjectId.isValid(item.group);
      })
    )
      return res
        .status(400)
        .json({ message: "Channel or Keyword ID not valid" });

  const author = await User.findById(userId).select(
    "dailyChar weeklyChar monthlyChar -_id"
  );
  //controlliamo che l'autore del messaggio esista
  if (!author) return res.status(400).json({ message: "Author not found" });

  const messLength =
    contentType === "text" ? content.length : constants.MEDIA_CHAR_DIMENSION;

  //controllo che ci siano abbastanza caratteri disponibili
  if (
    author.dailyChar < messLength ||
    author.weeklyChar < messLength ||
    author.monthlyChar < messLength
  )
    return res.status(400).json({ message: "Not enough character available" });
  // } else return res.status(400).json({ message: "Content type not accepted" });

  if (
    req.files?.squeal &&
    (contentType === "image" || contentType === "video")
  ) {
    const extension =
      "." +
      req.files.squeal?.name.slice(
        ((req.files.squeal?.name.lastIndexOf(".") - 1) >>> 0) + 2
      );

    try {
      const squeal = publicSqueal
        ? {
            author: userId,
            content: extension,
            contentType: contentType,
            publicSqueal: true,
          }
        : {
            author: userId,
            content: extension,
            contentType: contentType,
            receivers: req.body.receivers,
            officialChannel: req?.body?.officialChannel ? true : false, //bisogna settarlo solo quando si invia un messaggio in un canale ufficiale
          };
      const result = await Squeal.create(squeal);
      await User.findByIdAndUpdate(userId, {
        dailyChar: author.dailyChar - messLength,
        weeklyChar: author.weeklyChar - messLength,
        monthlyChar: author.monthlyChar - messLength,
      });
      req.files.squeal.mv("./public/squeal/" + result._id + extension);
      res.json(result);
    } catch (e) {
      console.error(e);
      res.json(e);
    }
  } else {
    try {
      const squeal = publicSqueal
        ? {
            author: userId,
            content: content,
            contentType: contentType,
            publicSqueal: true,
          }
        : {
            author: userId,
            content: content,
            contentType: contentType,
            receivers: req.body.receivers,
            officialChannel: req?.body?.officialChannel ? true : false, //bisogna settarlo solo quando si invia un messaggio in un canale ufficiale
          };
      const result = await Squeal.create(squeal);
      await User.findByIdAndUpdate(userId, {
        dailyChar: author.dailyChar - messLength,
        weeklyChar: author.weeklyChar - messLength,
        monthlyChar: author.monthlyChar - messLength,
      });
      res.json(result);
    } catch (e) {
      console.error(e);
      res.json(e);
    }
  }

  //Crea il file con ObjectId dell'utente come nome
};

const deleteSqueal = async (req, res) => {
  if (!req.authorized) return res.status(403);

  if (!mongoose.Types.ObjectId.isValid(req?.params?.squealId))
    return res.status(400).json({ message: "Squeal ID not valid" });

  try {
    const result = await Squeal.findByIdAndDelete(req.params.squealId);
    res.json(result);
  } catch (e) {
    console.error(e);
    res.json(e);
  }
};

//yourReact == true se la reaction è +, false se è -, null se non hai messo una reaction
const getReactions = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req?.params?.squealId))
    return res.status(400).json({ message: "Squeal ID not valid" });

  const neg0Reac = await Reaction.find({
    squealId: req.params.squealId,
    reactionType: 0,
  }).count();
  const neg1Reac = await Reaction.find({
    squealId: req.params.squealId,
    reactionType: 1,
  }).count();
  const pos2Reac = await Reaction.find({
    squealId: req.params.squealId,
    reactionType: 2,
  }).count();
  const pos3Reac = await Reaction.find({
    squealId: req.params.squealId,
    reactionType: 3,
  }).count();

  if (req?.authorized) {
    const yourReac = await Reaction.findOne({
      squealId: req.params.squealId,
      userId: req.id,
    });

    const response = {
      neg0Reac,
      neg1Reac,
      pos2Reac,
      pos3Reac,
      yourReac: yourReac?.reactionType,
    };
    res.status(200).json(response);
  } else {
    const response = {
      neg0Reac,
      neg1Reac,
      pos2Reac,
      pos3Reac,
    };
    res.status(200).json(response);
  }
};

//body.reactionType deve contenere l'intero che indica la reazione
const addReaction = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req?.params?.squealId))
    return res.status(400).json({ message: "Squeal ID not valid" });
  if (isNaN(req.body.reactionType))
    return res.status(400).json({ message: "Reaction type Not valid" });

  const squeal = await Squeal.findById(req.params.squealId);
  if (!squeal) return res.status(204).json({ message: `Squeal not found` });

  try {
    if (req?.authorized) {
      await Reaction.findOneAndRemove({
        squealId: req.params.squealId,
        userId: req.id,
      });
      const result = await Reaction.create({
        squealId: req.params.squealId,
        userId: req.id,
        reactionType: parseInt(req.body.reactionType),
      });

      manageReactions(squeal, req);

      res.status(200).json({ message: "OK" });
    } else {
      const result = await Reaction.create({
        squealId: req.params.squealId,
        reactionType: parseInt(req.body.reactionType),
      });

      manageReactions(squeal, req);

      res.status(200).json({ message: "OK" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

async function manageReactions(squeal, req) {
  // reactionType = 3 vale come doppio rispetto a reactionType = 2
  //solo reaction positive
  const numReactionPos =
    (await Reaction.countDocuments({
      squealId: req.params.squealId,
      userId: req.id,
      reactionType: 2,
    })) +
    2 *
      (await Reaction.countDocuments({
        squealId: req.params.squealId,
        userId: req.id,
        reactionType: 3,
      }));
  const numReactionNeg =
    (await Reaction.countDocuments({
      squealId: req.params.squealId,
      userId: req.id,
      reactionType: 1,
    })) +
    2 *
      (await Reaction.countDocuments({
        squealId: req.params.squealId,
        userId: req.id,
        reactionType: 0,
      }));

  //stabiliamo se un post è popolare o impopolare
  if (
    (numReactionPos >= squeal.impression * 0, 25) &&
    (numReactionNeg >= squeal.impression * 0, 25)
  ) {
    squeal.category = "controverso";
    await squeal.save();
  } else if ((numReactionPos >= squeal.impression * 0, 25)) {
    squeal.category = "popolare";
    await squeal.save();
    //aumento quota se questo è il decimo squeal popolare
    const contPop = await Squeal.count({
      author: squeal.author,
      category: "popolare",
    });
    if (contPop % 10 === 0) {
      const author = await User.findById(squeal.author);
      author.dailyChar = author.dailyChar + constants.DAILY_CHAR / 100;
      await author.save();
    }
  } else if ((numReactionNeg >= squeal.impression * 0, 25)) {
    squeal.category = "impopolare";
    await squeal.save();
    //diminuisco quota se questo è il terzo squeal impopolare
    const contImpop = await Squeal.count({
      author: squeal.author,
      category: "impopolare",
    });
    if (contImpop % 3 === 0) {
      const author = await User.findById(squeal.author);
      author.dailyChar = author.dailyChar - constants.DAILY_CHAR / 100;
      if (author.dailyChar < 0) author.dailyChar = 0;
      await author.save();
    }
  } else {
    squeal.category = null;
    await squeal.save();
  }
}

const removeReaction = async (req, res) => {
  if (!req.authorized) return res.sendStatus(403);

  if (!mongoose.Types.ObjectId.isValid(req?.params?.squealId))
    return res.status(400).json({ message: "Squeal ID not valid" });

  try {
    await Reaction.findOneAndRemove({
      squealId: req.params.squealId,
      userId: req.id,
    });
    res.status(200).json({ message: "OK" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const addReceiver = async (req, res) => {
  if (!req.authorized || !req.isMod) return res.sendStatus(403);

  const { groupType } = req.body;
  if (!groupType) return res.status(400).json({ message: "groupType missing" });

  try {
    const squealId = req.params.squealId;
    const destinatario = {
      group: req.params.receiverId,
      groupType: groupType,
    };

    const squeal = await Squeal.findById(squealId);
    if (!squeal) {
      return res.status(404).json({ error: "Squeal non trovato" });
    }

    squeal.receivers.push(destinatario);
    await squeal.save();

    return res
      .status(200)
      .json({ message: "Destinatario aggiunto con successo" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Errore durante l'aggiunta del destinatario" });
  }
};

const removeReceiver = async (req, res) => {
  if (!req.authorized || !req.isMod) return res.sendStatus(403);

  try {
    const squealId = req.params.squealId;

    const squeal = await Squeal.findById(squealId);
    if (!squeal) {
      return res.status(404).json({ error: "Squeal non trovato" });
    }

    const index = squeal.group.indexOf(req.params.receiverId);
    if (index === -1) {
      return res
        .status(404)
        .json({ error: "Destinatario non trovato nell'array" });
    }

    squeal.group.splice(index, 1);
    await squeal.save();

    return res
      .status(200)
      .json({ message: "Destinatario rimosso con successo" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Errore durante la rimozione del destinatario" });
  }
};

module.exports = {
  searchSqueal,
  getAllSquealsByUser,
  getAllSquealsInChannel,
  getAllSquealsInKeyword,
  createSqueal,
  deleteSqueal,
  getReactions,
  addReaction,
  removeReaction,
  addReceiver,
  removeReceiver,
};
