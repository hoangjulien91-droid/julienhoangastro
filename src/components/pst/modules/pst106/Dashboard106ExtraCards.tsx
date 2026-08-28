"use client";

import { useEffect, useState } from "react";
import { A, CARTES } from "@/lib/pst/data/pst106";
import { JourJQuiz } from "./JourJQuiz";

function decodeHtml(html: string) {
  if (typeof window === "undefined") return html.replace(/<[^>]+>/g, "");
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return (tmp.textContent || "").replace(/\s+/g, " ").trim();
}

function buildAudioQueue() {
  return CARTES.filter((c) => c[3] === "coeur").map((c) => ({
    author: A[c[0] as keyof typeof A] || "",
    text: decodeHtml(`${A[c[0] as keyof typeof A] || ""}. ${c[1]}. ${c[2]}`),
  }));
}

export function genFicheRevision106() {
  const css =
    "body{font-family:system-ui,-apple-system,sans-serif;max-width:210mm;margin:0 auto;padding:5mm;color:#111;font-size:9pt;line-height:1.3;box-sizing:border-box;}h1{font-size:14pt;font-weight:700;margin:0 0 2mm;text-align:center}.sub{color:#555;font-size:9pt;text-align:center;margin-bottom:4mm}h2{font-size:10.5pt;font-weight:700;margin:4mm 0 2mm;border-bottom:1.5px solid #222;padding-bottom:1mm;text-transform:uppercase;letter-spacing:0.02em}p{margin:0 0 2mm}ul{margin:1mm 0 2mm;padding-left:4mm}li{margin-bottom:1mm}b{color:#000;font-weight:700}.note{background:#f4f6f8;border-left:2px solid #5b6b7b;padding:2mm;font-size:8.5pt;margin:2mm 0}.cErg{color:#2E6E9E}.cAct{color:#3F8159}.cPsy{color:#7A5AA6}.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:2mm 6mm}@media print{@page{size:A4 portrait;margin:10mm;}body{padding:0;max-width:none;}}";
  const html =
    "<!DOCTYPE html><html lang=fr><head><meta charset=utf-8><title>PST106 — Fiche de révision</title><style>" +
    css +
    "</style></head><body>" +
    "<h1>PST106 — Fiche de révision</h1><div class='sub'>Clinique de l'activité, psychodynamique du travail et ergonomie</div>" +
    "<div class='grid-2'>" +
    "<div>" +
    "<h2>1. Histoire &amp; Psychotechnique (Lahy, Toulouse)</h2>" +
    "<p>La <b>psychotechnique</b> historique applique la psychologie expérimentale au travail. Ses caractéristiques &amp; limites&nbsp;:</p>" +
    "<ul><li><b>Méthode</b>&nbsp;: Utilisation de tests psychomoteurs pour associer le «&nbsp;bon travailleur au bon poste&nbsp;» afin d'optimiser le rendement (sélection objective).</li>" +
    "<li><b>Limites (Taylorisme)</b>&nbsp;: Ignore la subjectivité, la souffrance et la variabilité de l'activité réelle. Lahy et Wallon dénoncent l'usure prématurée de l'organisme par la parcellisation des tâches.</li>" +
    "<li><b>Destin</b>&nbsp;: Transition forcée vers l'ergonomie de l'activité et les cliniques du travail face à l'échec de l'approche positiviste.</li></ul>" +
    "<h2 class='cErg'>2. Wisner — Ergonomie de l'activité</h2>" +
    "<p><b>Projet&nbsp;:</b> L'<b>ergonomie de l'activité</b> vise à concevoir des situations de travail adaptées aux caractéristiques physiologiques et cognitives des humains pour préserver leur santé et garantir l'efficacité.</p>" +
    "<p><b>Notion clé&nbsp;:</b> Écart irréductible entre la <b>tâche prescrite</b> (objectifs, consignes) et l'<b>activité réelle</b> (régulations de l'opérateur face aux aléas).</p>" +
    "<p><b>Mécanisme&nbsp;:</b> L'opérateur effectue des régulations permanentes pour compenser les défaillances techniques, l'ambiance physique nocive ou la fatigue.</p>" +
    "<p><b>Exemple&nbsp;:</b> Le détournement des cadences par des ouvriers pour créer des stocks tampons et souffler (gestion des aléas organisationnels).</p>" +
    "<h2 class='cAct'>3. Clot — Clinique de l'activité</h2>" +
    "<p><b>Projet&nbsp;:</b> Restaurer le <b>pouvoir d'agir</b> des sujets en relançant le développement du métier et le dialogue professionnel entre pairs.</p>" +
    "<p><b>Notions clés&nbsp;:</b> Activité réalisée vs <b>réel de l'activité</b> (le possible, l'empêché, le suspendu) · <b>genre professionnel</b> (patrimoine collectif, règles de l'art) vs <b>style</b> (appropriation singulière du genre par le sujet).</p>" +
    "<p><b>Souffrance&nbsp;:</b> Provient de l'<b>activité empêchée</b> (être privé du pouvoir de bien faire son travail selon les règles du métier), amputant la subjectivité.</p>" +
    "<p><b>Méthodes&nbsp;:</b> Autoconfrontation simple (vidéo commentée par l'opérateur) et croisée (vidéo débattue avec un pair) pour relancer la controverse professionnelle.</p>" +
    "</div>" +
    "<div>" +
    "<h2 class='cPsy'>4. Dejours — Psychodynamique du travail</h2>" +
    "<p><b>Projet&nbsp;:</b> Analyser comment le psychisme humain négocie la contrainte organisationnelle, et comment transformer la souffrance en plaisir et en santé.</p>" +
    "<p><b>Notions clés&nbsp;:</b> Le travail est l'<b>épreuve du réel</b> · la souffrance est inévitable mais contenue par des <b>stratégies de défense collectives</b> (ex. idéologies défensives collectives dans les métiers dangereux).</p>" +
    "<p><b>Moteur de santé&nbsp;:</b> La <b>reconnaissance</b> transforme la souffrance en plaisir. Elle s'obtient par le <b>jugement de beauté</b> (pairs, validation des règles de l'art) et le <b>jugement d'utilité</b> (hiérarchie/clients).</p>" +
    "<p><b>Intelligence&nbsp;:</b> Mobilisation de l'<b>intelligence pratique (la mêtis)</b>, astucieuse et transgressive, face aux failles de la prescription.</p>" +
    "<h2>5. Synthèse &amp; Méthodologie jour J</h2>" +
    "<p><b>Ligne de partage&nbsp;:</b> Complémentarité des cliniques du travail. Clot est centré sur le développement de l'activité (action/dialogue) ; Dejours est centré sur les processus psychiques (souffrance/reconnaissance) ; Wisner est centré sur la physiologie et l'ergonomie cognitive.</p>" +
    "<div class='note'><b>Auteurs Bonus&nbsp;:</b> Georges Canguilhem (la santé comme création de normes, normativité) · Karl Marx (travail générique et aliénation) · Michel Foucault (les disciplines et corps dociles).</div>" +
    "<div class='note'><b>Méthode&nbsp;:</b> Idée &rarr; Auteur + concept &rarr; Exemple concret &rarr; Contraste avec un autre courant &rarr; Conclusion (la signature de l'auteur).</div>" +
    "</div>" +
    "</div>" +
    "</body></html>";
  const w = window.open("", "_blank");
  if (w) {
    w.document.write(html);
    w.document.close();
    w.focus();
    window.setTimeout(() => w.print(), 500);
  } else {
    window.alert("Autorise les fenêtres pop-up pour générer la fiche.");
  }
}

export function Dashboard106ExtraCards({
  onGoTab,
}: {
  onGoTab?: (panel: string) => void;
}) {
  const [jourJOpen, setJourJOpen] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioPaused, setAudioPaused] = useState(false);
  const [audioIdx, setAudioIdx] = useState(0);
  const [audioQueue] = useState(() => buildAudioQueue());

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis)
        window.speechSynthesis.cancel();
    };
  }, []);

  function speak(idx: number) {
    if (!window.speechSynthesis || idx >= audioQueue.length) {
      stopAudio();
      return;
    }
    const item = audioQueue[idx];
    if (!item) {
      stopAudio();
      return;
    }
    const u = new SpeechSynthesisUtterance(item.text);
    u.lang = "fr-FR";
    const voices = window.speechSynthesis.getVoices
      ? window.speechSynthesis.getVoices()
      : [];
    const fr = voices.find((v) => v.lang && v.lang.startsWith("fr"));
    if (fr) u.voice = fr;
    u.rate = 0.98;
    u.onend = () => {
      setAudioIdx((i) => {
        const next = i + 1;
        if (next >= audioQueue.length) {
          stopAudio();
        } else {
          speak(next);
        }
        return next;
      });
    };
    window.speechSynthesis.speak(u);
  }

  function startAudio() {
    if (!window.speechSynthesis) {
      window.alert(
        "La synthèse vocale n'est pas disponible sur ce navigateur.",
      );
      return;
    }
    window.speechSynthesis.cancel();
    setAudioIdx(0);
    setAudioPlaying(true);
    setAudioPaused(false);
    speak(0);
  }

  function stopAudio() {
    setAudioPlaying(false);
    setAudioPaused(false);
    setAudioIdx(0);
    if (window.speechSynthesis) window.speechSynthesis.cancel();
  }

  function pauseAudio() {
    if (!audioPlaying || !window.speechSynthesis) return;
    if (audioPaused) {
      window.speechSynthesis.resume();
      setAudioPaused(false);
    } else {
      window.speechSynthesis.pause();
      setAudioPaused(true);
    }
  }

  function nextAudio() {
    if (!audioPlaying || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const next = audioIdx + 1;
    if (next >= audioQueue.length) {
      stopAudio();
      return;
    }
    setAudioIdx(next);
    speak(next);
  }

  return (
    <>
      <div
        className="dcard"
        style={{ borderLeft: "4px solid var(--bad)", marginTop: 14 }}
      >
        <h3>Quiz du Jour J</h3>
        <p className="lead">
          10 questions tirées au sort (QCM + Vrai/Faux), 5 minutes chrono. Idéal
          pour s&apos;échauffer juste avant l&apos;épreuve.
        </p>
        <button className="btn" onClick={() => setJourJOpen(true)}>
          Lancer le quiz express →
        </button>
      </div>
      {jourJOpen && <JourJQuiz onClose={() => setJourJOpen(false)} />}

      <div
        className="dcard"
        style={{ borderLeft: "4px solid var(--clot)", marginTop: 14 }}
      >
        <h3>🎧 Révision audio</h3>
        <p className="lead">
          Écoute les cartes cœur lues à voix haute, en continu — révise les yeux
          fermés ou en déplacement.
        </p>
        <button className="btn" onClick={audioPlaying ? stopAudio : startAudio}>
          🎧{" "}
          {audioPlaying
            ? "Arrêter la lecture"
            : "Lire les cartes cœur en continu"}
        </button>
        {audioPlaying && (
          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            <button className="btn" onClick={pauseAudio}>
              {audioPaused ? "▶️ Reprendre" : "⏸️ Pause"}
            </button>
            <button className="btn" onClick={nextAudio}>
              ⏭️ Suivante
            </button>
          </div>
        )}
        {audioPlaying && (
          <div style={{ marginTop: 8, fontSize: 12, color: "var(--muted)" }}>
            Carte {audioIdx + 1} / {audioQueue.length}
            {audioQueue[audioIdx] ? ` — ${audioQueue[audioIdx].author}` : ""}
          </div>
        )}
      </div>

      <div
        className="dcard memo"
        style={{ borderLeft: "4px solid var(--accent)", marginTop: 14 }}
      >
        <h3>💡 Mémo de Survie Examen</h3>
        <p className="lead" style={{ marginBottom: 12 }}>
          Les 4 piliers indispensables pour structurer n&apos;importe quelle
          réponse rédigée le Jour J :
        </p>
        <ul
          style={{
            margin: 0,
            paddingLeft: 18,
            fontSize: 12.5,
            lineHeight: 1.45,
            display: "flex",
            flexDirection: "column",
            gap: 6,
            color: "var(--ink)",
          }}
        >
          <li>
            <b>1. Situer le Concept</b> : Toujours situer le concept dans sa
            théorie globale et nommer le courant (Ergonomie, Clinique,
            Psychodynamique).
          </li>
          <li>
            <b>2. Définir le Terme Clé</b> : Définir scientifiquement le concept
            (ex: Genre, Style, Activité réelle, Reconnaissance).
          </li>
          <li>
            <b>3. Donner l&apos;Exemple Réel</b> : Utiliser les cas cliniques du
            cours (ex: le port du casque chez les ouvriers, les guichetiers).
          </li>
          <li>
            <b>4. Contraster avec un autre Courant</b> : Montrer la
            complémentarité ou l&apos;opposition (ex: opposer le pouvoir
            d&apos;agir de Clot à la souffrance de Dejours).
          </li>
        </ul>
      </div>

      <div
        className="dcard"
        style={{ borderLeft: "4px solid var(--histoire)", marginTop: 14 }}
      >
        <h3>🧘 Rituel anti-panique</h3>
        <p className="lead">
          À faire dès que tu reçois le sujet — avant d&apos;écrire une seule
          ligne.
        </p>
        <ol
          style={{
            margin: 0,
            paddingLeft: 18,
            fontSize: 12.5,
            lineHeight: 1.5,
            display: "flex",
            flexDirection: "column",
            gap: 6,
            color: "var(--ink)",
          }}
        >
          <li>
            <b>Respire</b> : pose ton stylo, 3 respirations lentes. Le stress
            fait oublier, pas le manque de révision.
          </li>
          <li>
            <b>Lis la question 2 fois</b> : souligne le mot-clé et le verbe
            (définir ? comparer ? expliquer ?).
          </li>
          <li>
            <b>Plan au brouillon</b> : 3-4 idées dans l&apos;ordre +
            l&apos;auteur à citer, AVANT de rédiger.
          </li>
          <li>
            <b>Déroule les 4 piliers</b> : situer · définir · exemple ·
            contraster (cf. Mémo).
          </li>
          <li>
            <b>Garde 5 min</b> à la fin pour te relire.
          </li>
        </ol>
      </div>

      <div className="dcard" style={{ marginTop: 14 }}>
        <h3>Fiche de révision</h3>
        <p className="lead">
          Génère le cours condensé aux notions essentielles (les 3 auteurs +
          méthode), prêt à lire ou imprimer.
        </p>
        <button className="btn" onClick={genFicheRevision106}>
          Générer ma fiche de cours →
        </button>
      </div>
    </>
  );
}
