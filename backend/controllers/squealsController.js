const mongoose = require("mongoose");
const User = require("../models/User");
const Squeal = require("../models/Squeal");
const Reaction = require("../models/Reaction");
const constants = require("../config/constants");

const searchSqueal = async (req, res) => {
  if (!req.authorized) return res.sendStatus(403);
  if (!req.isMod) return res.sendStatus(403);

  const squeals = await Squeal.find({});

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

  const squeals = await Squeal.find({
    group: req.params.channelId,
    squealType: "Channel",
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
    group: req.params.keywordId,
    squealType: "Keyword",
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

  const { content, contentType, squealType } = req.body;
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId))
    return res.status(400).json({ message: "Author ID not valid" });
  if (!content && !req.files)
    return res.status(400).json({ message: "Body message required" });
  if (!contentType)
    return res.status(400).json({ message: "Content type required" });
  // if (!req.body?.squealType)
  //   return res.status(400).json({ message: "Squeal type required" });

  if (squealType === "Channel" || squealType === "Keyword")
    if (!req.body?.group?.map((item) => mongoose.Types.ObjectId.isValid(item)))
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
      const squeal = !(squealType === "Channel" || squealType === "Keyword")
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
            squealType: squealType,
            group: req.body.group,
            officialChannel:
              req?.body?.officialChannel && squealType === "Channel"
                ? true
                : false, //bisogna settarlo solo quando si invia un messaggio in un canale ufficiale
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
      const squeal = !(squealType === "Channel" || squealType === "Keyword")
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
            squealType: squealType,
            group: req.body.group,
            officialChannel:
              req?.body?.officialChannel && squealType === "Channel"
                ? true
                : false, //bisogna settarlo solo quando si invia un messaggio in un canale ufficiale
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

  const posReac = await Reaction.find({
    squealId: req.params.squealId,
    positiveReaction: true,
  }).count();

  const negReac = await Reaction.find({
    squealId: req.params.squealId,
    positiveReaction: true,
  }).count();

  if (req?.authorized) {
    const yourReac = await Reaction.findOne({
      squealId: req.params.squealId,
      userId: req.id,
    });

    const response = yourReac?.positiveReaction
      ? {
          posReac,
          negReac,
          yourReac: yourReac.positiveReaction,
        }
      : {
          posReac,
          negReac,
        };
    res.status(200).json(response);
  } else {
    const response = {
      posReac,
      negReac,
    };
    res.status(200).json(response);
  }
};

const addReaction = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req?.params?.squealId))
    return res.status(400).json({ message: "Squeal ID not valid" });
  if (!req?.body?.reaction)
    return res.status(400).json({ message: "Reaction required valid" });

  const squeal = await Squeal.findById(req.params.squealId);
  if (!squeal) return res.status(204).json({ message: `Squeal not found` });

  if (req?.authorized) {
    const result = await Reaction.findOneAndReplace(
      {
        squealId: req.params.squealId,
        userId: req.id,
      },
      {
        squealId: req.params.squealId,
        userId: req.id,
        positiveReaction: req.body.reaction === "positive",
      }
    );

    res.status(200).json({ message: "OK" });
  } else {
    const result = await Reaction.create({
      squealId: req.params.squealId,
      positiveReaction: req.body.reaction === "positive",
    });

    res.status(200).json({ message: "OK" });
  }
};

const addReceiver = async (req, res) => {
  if (!req.authorized || !req.isMod) return res.sendStatus(403);

  try {
    const squealId = req.params.squealId;
    const destinatarioId = req.params.receiverId;

    const squeal = await Squeal.findById(squealId);
    if (!squeal) {
      return res.status(404).json({ error: "Squeal non trovato" });
    }

    squeal.group.push(destinatarioId);
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
    const destinatarioId = req.params.receiverId;

    const squeal = await Squeal.findById(squealId);
    if (!squeal) {
      return res.status(404).json({ error: "Squeal non trovato" });
    }

    const index = squeal.group.indexOf(destinatarioId);
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
  addReceiver,
  removeReceiver,
};
