CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "Users can read their own roles" ON public.user_roles
FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- OFFERS
CREATE TABLE public.offers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  price_label text,
  badge text,
  image_url text,
  cta_label text NOT NULL DEFAULT 'Per WhatsApp anfragen',
  valid_until date,
  sort_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.offers TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.offers TO authenticated;
GRANT ALL ON public.offers TO service_role;
ALTER TABLE public.offers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active offers" ON public.offers FOR SELECT USING (is_active = true OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage offers" ON public.offers FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER offers_updated_at BEFORE UPDATE ON public.offers FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- SEO SETTINGS
CREATE TABLE public.seo_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path text NOT NULL UNIQUE,
  title text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  keywords text NOT NULL DEFAULT '',
  og_title text,
  og_description text,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.seo_settings TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.seo_settings TO authenticated;
GRANT ALL ON public.seo_settings TO service_role;
ALTER TABLE public.seo_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view seo settings" ON public.seo_settings FOR SELECT USING (true);
CREATE POLICY "Admins manage seo settings" ON public.seo_settings FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER seo_updated_at BEFORE UPDATE ON public.seo_settings FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- JOB OPENINGS
CREATE TABLE public.job_openings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  subtitle text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  employment_type text NOT NULL DEFAULT 'Vollzeit',
  requirements text NOT NULL DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.job_openings TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.job_openings TO authenticated;
GRANT ALL ON public.job_openings TO service_role;
ALTER TABLE public.job_openings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active jobs" ON public.job_openings FOR SELECT USING (is_active = true OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage jobs" ON public.job_openings FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER jobs_updated_at BEFORE UPDATE ON public.job_openings FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- QUOTE REQUESTS
CREATE TABLE public.quote_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  email text,
  service_type text NOT NULL DEFAULT 'Reparatur',
  message text NOT NULL DEFAULT '',
  photo_urls text[] NOT NULL DEFAULT '{}',
  status text NOT NULL DEFAULT 'neu',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.quote_requests TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.quote_requests TO authenticated;
GRANT ALL ON public.quote_requests TO service_role;
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit a quote request" ON public.quote_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins read quote requests" ON public.quote_requests FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update quote requests" ON public.quote_requests FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete quote requests" ON public.quote_requests FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- PARTNER REQUESTS
CREATE TABLE public.partner_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company text NOT NULL,
  contact_name text NOT NULL,
  email text NOT NULL,
  phone text,
  partner_type text NOT NULL DEFAULT 'Versicherung',
  message text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'neu',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.partner_requests TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.partner_requests TO authenticated;
GRANT ALL ON public.partner_requests TO service_role;
ALTER TABLE public.partner_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit a partner request" ON public.partner_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins read partner requests" ON public.partner_requests FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update partner requests" ON public.partner_requests FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete partner requests" ON public.partner_requests FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- SEED
INSERT INTO public.job_openings (title, subtitle, description, employment_type, requirements, sort_order) VALUES
('Kfz-Mechatroniker/in Geselle (m/w/d)', 'Du hast Benzin im Blut und liebst es, an Autos zu schrauben?', 'Du bist Problemlöser und kannst selbstständig arbeiten? Dann haben wir die passende Stelle für Dich. Bewirb dich noch heute bei Car-World.', 'Vollzeit', 'Führerschein min. Klasse B', 1),
('Ausbildung Kfz-Mechatroniker/in (m/w/d)', 'Deine Welt sind Öl & Autos?', 'Du willst vom Hobbyschrauber zum Profi werden? Wir helfen Dir gerne dabei. Bewirb Dich bei Car-World.', 'Ausbildung', 'Führerschein min. Klasse B von Vorteil', 2),
('Bürokauffrau / Bürokaufmann (m/w/d)', 'Organisationstalent mit Freude am Kundenkontakt?', 'Du übernimmst Terminplanung, Kundenkommunikation, Rechnungsstellung und die Abwicklung mit Versicherungen. Werde Teil unseres Teams.', 'Voll- oder Teilzeit', 'Kaufmännische Ausbildung oder Berufserfahrung im Büro', 3);

INSERT INTO public.offers (title, description, price_label, badge, valid_until, sort_order) VALUES
('Reifenwechsel Aktion', 'Räderwechsel inkl. Auswuchten und Luftdruckkontrolle — schnell und ohne langes Warten.', 'ab 29 €', 'Saison', NULL, 1),
('Steinschlag-Reparatur', 'Reparatur Ihres Steinschlags in wenigen Minuten — in vielen Fällen kostenfrei über Ihre Versicherung.', 'oft 0 € Eigenanteil', 'Top', NULL, 2),
('Klimaanlagen-Service', 'Desinfektion, Dichtheitsprüfung und Befüllung für frische Luft im Innenraum.', 'ab 89 €', NULL, NULL, 3),
('Inspektion nach Herstellervorgabe', 'Mit Garantieerhalt — inklusive Fahrzeug-Check und digitalem Prüfprotokoll.', 'ab 149 €', NULL, NULL, 4),
('HU / AU Termin', 'Hauptuntersuchung direkt bei uns im Haus, inklusive Vorabcheck.', 'ab 129 €', NULL, NULL, 5),
('Frontscheiben-Austausch', 'Neue Frontscheibe inkl. Kamerakalibrierung — Abwicklung direkt mit Ihrer Versicherung.', 'auf Anfrage', 'Beliebt', NULL, 6);

INSERT INTO public.seo_settings (page_path, title, description, keywords) VALUES
('/', 'Car-World — Deine Nr. 1 Autowerkstatt in Bad Neuenahr-Ahrweiler', 'Autowerkstatt in meiner Nähe: Unfallservice, Unfallschaden, Frontscheibe, Lackschaden und Reparatur — alles aus einer Hand. 7/24 per WhatsApp erreichbar.', 'Autowerkstatt in meiner Nähe, Unfallservice, Unfallschaden, Kfz-Werkstatt Bad Neuenahr-Ahrweiler, Frontscheibe wechseln, Lackschaden reparieren'),
('/leistungen', 'Leistungen — Alles aus einer Hand | Car-World', 'Unfallservice, Abschleppdienst, Lackierung, Frontscheibe, Inspektion und Versicherungsabwicklung bei Ihrer Autowerkstatt in meiner Nähe.', 'Autowerkstatt in meiner Nähe, Unfallservice, Abschleppdienst, Lackschaden, Frontscheibe'),
('/partner', 'Partner werden — Versicherungen, Flotten & Wartungsverträge | Car-World', 'Werden Sie Partner von Car-World: Versicherungen, Firmen mit eigener Flotte und Wartungsverträge.', 'Werkstattpartner, Flottenservice, Versicherungspartner, Wartungsvertrag'),
('/karriere', 'Karriere bei Car-World — Jetzt bewerben', 'Offene Stellen: Kfz-Mechatroniker/in, Ausbildung und Bürokauffrau/-mann in Bad Neuenahr-Ahrweiler.', 'Kfz Mechatroniker Job Ahrweiler, Ausbildung Kfz, Bürokauffrau Werkstatt'),
('/aktuelle-angebote', 'Aktuelle Angebote — Car-World Autowerkstatt', 'Saisonale Angebote: Reifenwechsel, Klimaservice, Inspektion und mehr in Ihrer Autowerkstatt in meiner Nähe.', 'Reifenwechsel Angebot, Klimaservice, Inspektion Angebot, Autowerkstatt in meiner Nähe');