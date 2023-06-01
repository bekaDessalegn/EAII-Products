SET check_function_bodies = false;
INSERT INTO public.categories (id, name, created_at, updated_at, description) VALUES (1, 'Health', '2023-04-26 08:49:59.935751+00', '2023-04-26 13:12:47.005664+00', 'Products for Health Sector.');
INSERT INTO public.categories (id, name, created_at, updated_at, description) VALUES (2, 'Agriculture', '2023-04-26 08:50:21.015157+00', '2023-04-26 13:13:17.622745+00', 'Products for Agriculture Sector.');
INSERT INTO public.categories (id, name, created_at, updated_at, description) VALUES (3, 'Language', '2023-04-26 08:50:37.311705+00', '2023-04-26 13:13:45.155253+00', 'AI Products for Language Detection, Speaker Identification and Speech Transcription.');
INSERT INTO public.categories (id, name, created_at, updated_at, description) VALUES (4, 'Financial', '2023-04-26 08:50:50.656175+00', '2023-04-26 13:14:13.033389+00', 'Products for Financial Sector.');
SELECT pg_catalog.setval('public.categories_id_seq', 4, true);
