/* Extrait mécaniquement (texte source littéral) depuis pst106.astro.disabled — widget 'Instruction au Sosie' */

export const SOSIE_SCENARIOS = {
  bus_normal: {
    title: "Chauffeur de bus de nuit (Ligne 99) - Normal",
    intro:
      "Sosie : Bonjour ! Je te remplace ce soir sur la ligne 99. Dis-moi, comment je fais pour conduire le bus en toute sécurité et à l'heure ?",
    steps: [
      {
        question:
          "Sosie : Première situation : à 23h30, un groupe de jeunes alcoolisés monte sans ticket et commence à chanter fort en tapant sur les vitres. Le règlement officiel prescrit de couper le moteur, d'appeler le PC sécurité et d'attendre. Que fait-on ?",
        opts: [
          {
            text: "Couper le moteur, appeler le PC sécurité et attendre leur arrivée.",
            feedback:
              "Sosie : Les passagers se sont énervés, le groupe s'est moqué de moi, et j'ai bloqué la ligne pendant 40 minutes. Le chef m'a reproché mon manque d'initiative sur le terrain. C'est du travail prescrit aveugle !",
            score: 20,
          },
          {
            text: "Saluer le groupe avec assurance, plaisanter avec le leader en klaxonnant de manière complice pour détendre l'atmosphère et continuer à rouler.",
            feedback:
              "Sosie : Génial ! Ça a marché tout de suite. Le groupe s'est calmé, ils se sont assis au fond, et j'ai pu finir mon service à l'heure. C'est l'usage du 'genre professionnel' : l'intelligence collective des conducteurs !",
            score: 100,
          },
        ],
      },
      {
        question:
          "Sosie : Plus tard, vers minuit, ce même groupe commence à provoquer verbalement un autre voyageur assis près de la cabine. La consigne officielle est d'utiliser le haut-parleur pour les menacer de sanctions et s'arrêter au prochain arrêt.",
        opts: [
          {
            text: "Prendre le micro et faire l'annonce officielle : 'Tout acte d'agression fera l'objet de poursuites pénales.'",
            feedback:
              "Sosie : Aïe ! Le groupe s'est senti défié publiquement. Ils ont insulté le voyageur de plus belle et ont cassé un accoudoir. La prescription rigide et dépersonnalisée a empiré le conflit.",
            score: 30,
          },
          {
            text: "Ralentir doucement, les regarder dans le rétroviseur et dire calmement : 'Les gars, s'il vous plaît, restez tranquilles pour qu'on rentre tous en paix ce soir. Je compte sur vous.'",
            feedback:
              "Sosie : Incroyable ! Le leader a dit 'C'est bon chef, tranquille' et ils ont arrêté. C'est du grand art : mobiliser la responsabilité collective et le sens éthique informel.",
            score: 100,
          },
        ],
      },
      {
        question:
          "Sosie : Enfin, au terminus, le moteur s'arrête net. Le voyant moteur rouge clignote. Le protocole impose d'attendre la dépanneuse sans rien toucher, ce qui prendra 2 heures et annulera le dernier retour.",
        opts: [
          {
            text: "Suivre le protocole à la lettre, couper le contact et attendre la dépanneuse.",
            feedback:
              "Sosie : J'ai attendu dans le froid. Les derniers passagers du soir sont restés bloqués sans transport. C'est du zèle administratif qui détruit l'utilité sociale du service.",
            score: 10,
          },
          {
            text: "Ouvrir le capot, purger manuellement la valve de décharge du compresseur d'air (astuce connue des anciens pour réinitialiser le capteur), puis redémarrer.",
            feedback:
              "Sosie : Ça a fonctionné directement ! Le moteur est reparti et j'ai assuré le dernier retour. C'est le style individuel enrichi par le genre : s'approprier l'outil pour faire face au réel.",
            score: 100,
          },
        ],
      },
    ],
    synthesis:
      "<b>Analyse Clinique (PST106) :</b> Ce scénario démontre la distance irréductible entre le <i>travail prescrit</i> (règlements rigides) et le <i>travail réel</i>. Face aux aléas, le conducteur s'appuie sur le <b>genre professionnel</b> (règles de métier informelles) et son <b>style propre</b> (connivence, astuces de terrain) pour préserver la sécurité ET l'utilité sociale du service.",
  },
  bus_hard: {
    title: "Chauffeur de bus de nuit (Ligne 99) - Difficile",
    intro:
      "Sosie (Voix tendue) : Bonjour ! Les tensions grimpent ce soir sur la ligne. Que fait-on ?",
    steps: [
      {
        question:
          "Sosie : Première crise : une altercation physique éclate entre voyageurs dans le tunnel du RER (sans couverture réseau). Le protocole de sécurité impose d'immobiliser le bus immédiatement.",
        opts: [
          {
            text: "Immobiliser le bus sur-le-champ dans le tunnel sombre et verrouiller les portes en attendant les secours.",
            feedback:
              "Sosie : Catastrophe ! Sans réseau, j'ai été coupé du monde. La panique a éclaté à bord, des usagers ont brisé les vitres pour sortir sur les voies ferrées actives. La prescription a créé un sur-accident !",
            score: 10,
          },
          {
            text: "Maintenir une vitesse réduite pour sortir du tunnel et immobiliser le bus dans la station éclairée suivante sous couverture réseau.",
            feedback:
              "Sosie : Excellent choix. J'ai pu appeler immédiatement le PC sécurité et sécuriser l'évacuation dans une zone hors de danger. L'arbitrage de sécurité réelle face aux règles inadaptées.",
            score: 100,
          },
        ],
      },
      {
        question:
          "Sosie : Au terminus, la police souhaite procéder à un contrôle inopiné systématique des usagers. Le manager m'ordonne de couper les moteurs et de bloquer les issues pour collaborer activement.",
        opts: [
          {
            text: "Couper les moteurs et bloquer les issues comme exigé pour préserver l'entente avec la direction.",
            feedback:
              "Sosie : Les passagers se sont révoltés contre cette rétention forcée. Le bus a été vandalisé et j'ai perdu toute légitimité auprès du public de la ligne. C'est de la soumission éthique.",
            score: 20,
          },
          {
            text: "Refuser de bloquer les passagers de force, mais ouvrir les portes et proposer une médiation neutre pour maintenir le calme durant le contrôle.",
            feedback:
              "Sosie : Très bien. Le calme est resté de mise, la police a fait son travail sans débordement et le bus a préservé son statut d'espace public neutre.",
            score: 100,
          },
        ],
      },
      {
        question:
          "Sosie : Une grève spontanée débute au dépôt. La direction me promet une prime substantielle si je prends le volant pour casser le piquet, menaçant de me licencier en cas de refus.",
        opts: [
          {
            text: "Prendre le volant sous la pression managériale pour protéger mon emploi.",
            feedback:
              "Sosie : Les collègues m'ont pris en grippe. Le climat de travail au dépôt est devenu invivable (souffrance relationnelle durable). J'ai sacrifié le collectif professionnel.",
            score: 10,
          },
          {
            text: "Refuser poliment en invoquant les risques de sécurité et le respect de la controverse collective.",
            feedback:
              "Sosie : Bravo. Les collègues ont salué ma posture éthique et la direction a reculé. Le dialogue social a pu s'ouvrir sur le travail réel.",
            score: 100,
          },
        ],
      },
    ],
    synthesis:
      "<b>Analyse Clinique (PST106) :</b> En mode difficile, les arbitrages touchent à la <b>souffrance éthique</b> et à la protection du collectif. Face aux injonctions paradoxales de la hiérarchie ou des institutions, le style professionnel s'affirme comme une résistance éthique indispensable à la santé.",
  },
  guichet_normal: {
    title: "Agent d'accueil (Client agressif) - Normal",
    intro:
      "Sosie : Salut ! C'est ma première journée au guichet d'accueil. Comment je gère les clients ?",
    steps: [
      {
        question:
          "Sosie : Un usager furieux arrive en criant parce que son dossier de droits a été perdu. Il exige de voir le directeur. La règle officielle est de lui dire de repasser demain ou d'appeler le standard.",
        opts: [
          {
            text: "Répéter calmement la règle officielle : 'Monsieur, vous devez appeler le standard ou revenir demain.'",
            feedback:
              "Sosie : Le client a tapé sur la vitre et m'a insulté. La situation a dégénéré en conflit direct. Suivre la règle formelle face à la détresse a aggravé son sentiment d'impuissance.",
            score: 20,
          },
          {
            text: "Valider sa colère : 'Je comprends tout à fait votre frustration, c'est anormal. Asseyez-vous, on va regarder ensemble sur mon écran ce que je peux faire.'",
            feedback:
              "Sosie : Il s'est calmé immédiatement. Même si je ne peux pas résoudre son problème à la seconde, il s'est senti écouté. C'est la régulation de la charge émotionnelle par le dialogue.",
            score: 100,
          },
        ],
      },
      {
        question:
          "Sosie : En creusant son dossier, je vois que la saisie a été bloquée par le service central. L'usager crie : 'C'est inadmissible ! Votre administration est nulle !' Que dois-je lui répondre ?",
        opts: [
          {
            text: "Défendre l'institution : 'C'est la procédure, monsieur, nous avons des milliers de dossiers à traiter.'",
            feedback:
              "Sosie : Il s'est remis en colère. Défendre la bureaucratie me coupe de la réalité de l'usager et crée de la souffrance éthique.",
            score: 30,
          },
          {
            text: "Rejoindre son point de vue tout en restant professionnel : 'C'est vrai que ce nouveau portail informatique pose problème. Regardez, je vais forcer manuellement la validation en note de secours.'",
            feedback:
              "Sosie : Formidable. En contournant intelligemment le bug, on a débloqué la situation. C'est l'activité de service qui vise la résolution réelle plutôt que le respect d'une procédure défaillante.",
            score: 100,
          },
        ],
      },
      {
        question:
          "Sosie : Le directeur passe derrière le guichet et me chuchote : 'Dépêchez-vous et respectez le protocole standard, on a trop de monde dans la file d'attente.'",
        opts: [
          {
            text: "Obéir au directeur, abandonner la saisie manuelle et renvoyer l'usager vers la file d'attente.",
            feedback:
              "Sosie : L'usager est reparti furieux, et moi je me suis senti vide et inutile toute la journée. C'est l'aliénation par la prescription managériale quantitative.",
            score: 10,
          },
          {
            text: "Finir tranquillement la note de secours avec l'usager, puis aborder la discussion avec le directeur en salle de pause sur la nécessité de ces arbitrages pour éviter les incivilités.",
            feedback:
              "Sosie : C'est la bonne posture ! C'est ce qu'on appelle ouvrir la <b>controverse professionnelle</b> sur la qualité du travail : discuter de l'écart réel/prescrit pour défendre son métier.",
            score: 100,
          },
        ],
      },
    ],
    synthesis:
      "<b>Analyse Clinique (PST106) :</b> L'activité d'accueil montre la tension entre la <i>quantité prescrite</i> (débit d'usagers imposé) et la <i>qualité réelle</i> du service. Dépasser la souffrance éthique demande de pouvoir arbitrer en faveur du destinataire, tout en ouvrant des espaces de discussion (controverse) avec la hiérarchie.",
  },
  guichet_hard: {
    title: "Agent d'accueil (Client agressif) - Difficile",
    intro:
      "Sosie (Inquiet) : Salut. Une situation critique au guichet ce matin. Un cas limite...",
    steps: [
      {
        question:
          "Sosie : Une dame âgée menacée d'expulsion supplie de falsifier son attestation de revenus pour gagner une semaine de sursis. La règle interdit toute falsification sous peine de poursuites.",
        opts: [
          {
            text: "Falsifier le document par empathie immédiate.",
            feedback:
              "Sosie : C'est une faute grave. L'attestation a été rejetée au contrôle automatique, la dame a été pénalisée pour fraude et je risque une sanction disciplinaire.",
            score: 20,
          },
          {
            text: "Refuser la falsification mais l'orienter immédiatement vers le pôle d'assistance sociale d'urgence en rédigeant un signalement prioritaire.",
            feedback:
              "Sosie : C'est la bonne posture éthique : respecter le cadre légal du métier tout en mobilisant les ressources réelles d'aide d'urgence.",
            score: 100,
          },
        ],
      },
      {
        question:
          "Sosie : La direction installe des caméras à reconnaissance faciale pour évaluer l'humeur des agents et des clients, avec des alertes automatiques si un agent ne sourit pas.",
        opts: [
          {
            text: "Sourire artificiellement toute la journée pour éviter les alertes.",
            feedback:
              "Sosie : Épuisement professionnel immédiat (travail émotionnel aliéné). J'ai accepté une prescription technique dégradante.",
            score: 10,
          },
          {
            text: "Signaler le problème au collectif et exiger une réunion d'équipe pour débattre de cette intrusion dans l'activité réelle.",
            feedback:
              "Sosie : Parfait. En ouvrant la controverse sur l'outil, le collectif a réussi à faire suspendre le dispositif de surveillance émotionnelle.",
            score: 100,
          },
        ],
      },
      {
        question:
          "Sosie : Une consigne ministérielle supprime tout accueil physique pour les personnes âgées, imposant l'usage d'une borne numérique externe complexe. Une dame pleure car elle n'y arrive pas.",
        opts: [
          {
            text: "Lui indiquer gentiment la borne et retourner à mes tâches administratives obligatoires.",
            feedback:
              "Sosie : Elle est repartie sans ses droits, et moi avec un sentiment de honte professionnelle. La prescription quantitative détruit le sens du service.",
            score: 15,
          },
          {
            text: "Prendre 5 minutes pour l'accompagner à la borne, valider sa démarche, et consigner le dysfonctionnement de l'accueil pour le remonter en réunion.",
            feedback:
              "Sosie : Magnifique. J'ai agi en professionnel responsable, en traitant le besoin réel tout en alimentant le retour d'expérience sur la prescription.",
            score: 100,
          },
        ],
      },
    ],
    synthesis:
      "<b>Analyse Clinique (PST106) :</b> Les cas limites d'accueil soulignent l'importance de la <b>déontologie professionnelle</b> comme rempart contre la déshumanisation du travail de service.",
  },
  machine_normal: {
    title: "Opérateur d'usine (Presse hydraulique) - Normal",
    intro:
      "Sosie : Salut, je dois démarrer la presse hydraulique n°4 ce matin. Une consigne particulière ?",
    steps: [
      {
        question:
          "Sosie : Le manuel de sécurité indique d'appuyer sur le bouton de démarrage immédiat dès la mise sous tension. Mais j'entends un sifflement métallique aigu et inhabituel dans le circuit hydraulique à froid. Qu'est-ce que je fais ?",
        opts: [
          {
            text: "Ignorer le bruit et appuyer sur le bouton vert de démarrage direct comme l'indique la fiche de poste.",
            feedback:
              "Sosie : Catastrophe ! La pompe hydraulique a grippé à sec. La machine est hors service et la ligne de production est arrêtée. Le manuel ignore le 'sens du toucher' et de l'ouïe que l'expérience enseigne.",
            score: 20,
          },
          {
            text: "Faire tourner la pompe de décharge manuellement pendant 3 minutes à vide pour faire monter l'huile en température avant de lancer la presse.",
            feedback:
              "Sosie : Super ! Le sifflement s'est atténué, la pompe s'est lubrifiée et la machine a démarré sans heurts. C'est l'art d'écouter les alertes informelles de la matière.",
            score: 100,
          },
        ],
      },
      {
        question:
          "Sosie : La machine tourne, mais le capteur de pression d'huile affiche une anomalie (voyant orange, baisse de 8%). Le chef d'équipe crie : 'On est en retard sur la livraison, produis quand même !'",
        opts: [
          {
            text: "Obéir au chef d'équipe et lancer la production en ignorant le voyant orange d'anomalie.",
            feedback:
              "Sosie : Les pièces produites sont sorties avec des micro-fissures invisibles à l'œil nu, rejetées au contrôle qualité final. Perte de temps et de matière. La pression de rendement a nui à la qualité de l'art.",
            score: 30,
          },
          {
            text: "Refuser de produire en l'état, ajuster la vis de retour d'huile de 10 degrés (une astuce mécanique simple) pour restabiliser la pression à 100% avant de démarrer.",
            feedback:
              "Sosie : Excellent choix. La pression est redevenue verte et toutes les pièces sont conformes. C'est la primauté de la qualité du travail face aux exigences de productivité aveugle.",
            score: 100,
          },
        ],
      },
      {
        question:
          "Sosie : Après 100 cycles, l'alarme thermique interne ne s'est pas déclenchée mais une odeur de surchauffe commence à monter de l'huile. Que faire ?",
        opts: [
          {
            text: "Continuer de produire tant que l'ordinateur de contrôle ne bloque pas la machine automatiquement.",
            feedback:
              "Sosie : Mauvaise idée... Les joints thermiques ont fondu. Le système de sécurité automatique s'est déclenché trop tard, causant des dégâts majeurs. La machine est arrêtée pour 3 jours.",
            score: 10,
          },
          {
            text: "Mettre en pause la production, nettoyer le filtre à huile au chiffon (souvent obstrué par de la limaille à chaud) et laisser refroidir quelques minutes.",
            feedback:
              "Sosie : Génial, le filtre était bien saturé. Nettoyé, la température est redescendue et la presse a repris sa cadence normale. C'est le style professionnel de l'opérateur en action.",
            score: 100,
          },
        ],
      },
    ],
    synthesis:
      "<b>Analyse Clinique (PST106) :</b> Travailler avec des machines nécessite le développement de <i>l'intelligence pratique (métis)</i>. Les manuels officiels décrivent des situations stables, mais le réel oppose toujours des résistances. Le professionnel s'approprie la technique par son <b>style d'action</b> pour défendre la qualité du travail bien fait.",
  },
  machine_hard: {
    title: "Opérateur d'usine (Presse hydraulique) - Difficile",
    intro:
      "Sosie (Voix forte) : C'est la panique sur la ligne de production. Risque machine majeur !",
    steps: [
      {
        question:
          "Sosie : Une fuite d'huile toxique apparaît sous la cuve. Le capteur de niveau ne s'active pas (défaillant). Le chef d'usine me demande d'éponger avec de la sciure et de continuer la presse.",
        opts: [
          {
            text: "Appliquer la sciure et continuer la production pour ne pas interrompre le flux.",
            feedback:
              "Sosie : Les émanations m'ont rendu malade, j'ai dû être évacué. Prioriser le flux sur le risque physique direct est une aliénation pathogène.",
            score: 10,
          },
          {
            text: "Déclencher immédiatement mon droit de retrait, couper l'alimentation et alerter la maintenance industrielle d'urgence.",
            feedback:
              "Sosie : Parfait. La sécurité des personnes et de l'environnement prime sur toute injonction de productivité.",
            score: 100,
          },
        ],
      },
      {
        question:
          "Sosie : La direction m'accuse de 'sabotage économique' pour avoir arrêté la chaîne et me menace d'un blâme.",
        opts: [
          {
            text: "Reconnaître mon tort et accepter le blâme pour éviter le conflit hiérarchique.",
            feedback:
              "Sosie : Mauvais calcul. Accepter la culpabilité isole l'opérateur et valide des pratiques managériales toxiques.",
            score: 20,
          },
          {
            text: "Mobiliser le collectif de pairs et le CHSCT pour documenter l'historique des pannes signalées et non résolues.",
            feedback:
              "Sosie : Excellent. En transformant le conflit individuel en débat collectif, la direction a retiré sa menace et planifié la réparation.",
            score: 100,
          },
        ],
      },
      {
        question:
          "Sosie : La direction propose d'automatiser entièrement la maintenance par un algorithme qui m'interdit de modifier les réglages de la presse à l'avenir.",
        opts: [
          {
            text: "Accepter l'algorithme pour me décharger de la responsabilité physique du diagnostic.",
            feedback:
              "Sosie : Perte complète du savoir-faire métier. Sans pouvoir d'agir sur l'outil, l'activité se vide de son intelligence et de son sens.",
            score: 15,
          },
          {
            text: "Défendre une conception hybride où l'algorithme suggère mais l'opérateur conserve la décision de réglage finale.",
            feedback:
              "Sosie : C'est la défense de la compétence et de la subjectivité au travail. L'outil doit rester au service de l'activité du sujet.",
            score: 100,
          },
        ],
      },
    ],
    synthesis:
      "<b>Analyse Clinique (PST106) :</b> Les automatismes algorithmiques et la répression des signaux d'alerte illustrent les dérives du <b>taylorisme moderne</b>. L'opérateur doit défendre son rôle d'analyste face à la technique.",
  },
};
