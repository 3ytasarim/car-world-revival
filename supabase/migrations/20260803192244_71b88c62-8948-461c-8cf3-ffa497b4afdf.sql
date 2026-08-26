CREATE TABLE public.testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL DEFAULT 'Kunde',
  text text NOT NULL DEFAULT '',
  image_url text,
  rating integer NOT NULL DEFAULT 5,
  sort_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.testimonials TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.testimonials TO authenticated;
GRANT ALL ON public.testimonials TO service_role;

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active testimonials" ON public.testimonials
  FOR SELECT USING (is_active = true OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins manage testimonials" ON public.testimonials
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER testimonials_updated_at BEFORE UPDATE ON public.testimonials
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.testimonials (name, role, text, rating, sort_order) VALUES
('Michael K.', 'Unfallservice', 'Nach meinem Unfall haben die alles übernommen — Abschleppen, Versicherung, Ersatzwagen. Ich musste nichts machen.', 5, 1),
('Sandra B.', 'Frontscheibe', 'Steinschlag am Morgen gemeldet, mittags war die Scheibe repariert. Top Service!', 5, 2),
('Tolga Y.', 'Foto-Angebot', 'Fotos per WhatsApp geschickt, am nächsten Tag hatte ich mein Angebot. Sehr unkompliziert.', 5, 3),
('Familie Weber', 'Inspektion', 'Ehrliche Beratung, faire Preise und ein sehr freundliches Team. Klare Empfehlung.', 5, 4),
('Dennis R.', 'Lackierung', 'Die Lackierung sieht aus wie ab Werk. Termin wurde exakt eingehalten.', 5, 5),
('Aylin S.', 'Reifenservice', 'Reifenwechsel ohne Termin, in 30 Minuten war ich wieder unterwegs.', 5, 6),
('Peter H.', 'Flottenkunde', 'Als Firma mit mehreren Fahrzeugen schätzen wir die schnelle Abwicklung sehr.', 5, 7),
('Nina L.', 'Unfallgutachten', 'Gutachten, Werkstatt und Versicherung — alles aus einer Hand. Sehr entspannt.', 5, 8),
('Kerem A.', 'Abschleppdienst', 'Nachts liegengeblieben, innerhalb einer Stunde war das Abschleppfahrzeug da.', 5, 9);