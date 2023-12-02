## MODERATOR DASHBOARD:

- filtrare utenti per popolarità.
- cambiare proprietari e nome canale (api/channels/:channelId/name PATCH)
- bloccare canale
- aggiungere, togliere e cambiare la descrizione dei CANALI ufficiali
- come ottengo gli id di channel e keyword per aggiungerli ai receivers???
- caricare squeals a blocchi, bisogna però aggiungere i filtri tramite api e non solo nel frontend (users e channels???)

Utenti:
Il moderatore può elencare gli utenti e filtrarli per nome, tipo e popolarità.
Può bloccare e riabilitare gli utenti a mano. Può aumentare a mano i caratteri residui per singoli utenti.

Squeal:
Elencare i post e filtrarli per mittente, data e destinatari.
Può cambiare a mano i destinatari (ad esempio, aggiungere §CANALI ufficiali Squealer). Può cambiare a mano il numero di reazioni positive e/o negative.

§canali:
elencare i §canali degli utenti e filtrarli per proprietari, numero di post e popolarità. Può cambiare a mano i proprietari ed il nome. Può bloccare un §canale.

§CANALI:
elencare i §CANALI ufficiali Squealer, aggiungerne, toglierne e cambiarne la descrizione (utile per gli altri moderatori).
Può aggiungere uno squeal ad un §CANALE o rimuoverlo in qualunque momento.
Può aggiungere una regola che attribuisce automaticamente un post ad un canale se soddisfa un criterio.
