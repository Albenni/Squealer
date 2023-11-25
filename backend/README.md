api da fare (poche):

- Differenziare tra canali pubblici e canali privati -> un utente fa richiesta per un canale privato, se l'admin lo accetta dopo può leggere e scrivere

- Messaggi temporizzati

- api per incrementare la quota giornaliera di caratteri
  Un utente può aumentare la quota comprandola (per un anno), oppure ottenendo apprezzamenti dal proprio pubblico.
  Similmente, le reazioni negative diminuiscono la quota (anche quella comprata) fino a farla scomparire (vedi prossime slide)

- Modificare la quota giornaliera di caratteri in base alle reazioni ricevute
  Un utente che posta messaggi sistematicamente popolari viene premiato con un aumento di quota,
  se impopolari riceve una diminuzione della quota fino a zero (inclusa la quota acquistata):
  ogni 10 messaggi con R+>CM vinco 1% della quota iniziale, ogni 3 messaggi con R- > CM perdo 1% della quota iniziale.

Da finire/testare:

- generateFeed: bisogna testare populate quando c'è una keyword
- comments
- aggiunta/rimozione destinatari dagli squeal
- delete reaction ad uno squeal
