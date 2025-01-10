--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: alembic_version; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.alembic_version (
    version_num character varying(32) NOT NULL
);


ALTER TABLE public.alembic_version OWNER TO postgres;

--
-- Name: recycling_center; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.recycling_center (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    address character varying(200) NOT NULL,
    latitude double precision,
    longitude double precision,
    city character varying(50) NOT NULL,
    phone character varying(20),
    website character varying(100),
    likes integer
);


ALTER TABLE public.recycling_center OWNER TO postgres;

--
-- Name: recycling_center_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.recycling_center_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.recycling_center_id_seq OWNER TO postgres;

--
-- Name: recycling_center_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.recycling_center_id_seq OWNED BY public.recycling_center.id;


--
-- Name: recycling_fact; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.recycling_fact (
    id integer NOT NULL,
    fact text NOT NULL
);


ALTER TABLE public.recycling_fact OWNER TO postgres;

--
-- Name: recycling_fact_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.recycling_fact_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.recycling_fact_id_seq OWNER TO postgres;

--
-- Name: recycling_fact_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.recycling_fact_id_seq OWNED BY public.recycling_fact.id;


--
-- Name: user_profile; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_profile (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(100) NOT NULL,
    favorite_centers json
);


ALTER TABLE public.user_profile OWNER TO postgres;

--
-- Name: user_profile_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_profile_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_profile_id_seq OWNER TO postgres;

--
-- Name: user_profile_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_profile_id_seq OWNED BY public.user_profile.id;


--
-- Name: recycling_center id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recycling_center ALTER COLUMN id SET DEFAULT nextval('public.recycling_center_id_seq'::regclass);


--
-- Name: recycling_fact id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recycling_fact ALTER COLUMN id SET DEFAULT nextval('public.recycling_fact_id_seq'::regclass);


--
-- Name: user_profile id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_profile ALTER COLUMN id SET DEFAULT nextval('public.user_profile_id_seq'::regclass);


--
-- Data for Name: alembic_version; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.alembic_version (version_num) VALUES ('76182ba6f9cb');



--
-- Data for Name: recycling_center; Type: TABLE DATA; Schema: public; Owner: postgres
--

-- Replace the COPY for recycling_center with INSERT statements
INSERT INTO public.recycling_center (id, name, address, latitude, longitude, city, phone, website, likes)
VALUES
(1, 'Goodwill', '1234 Main Street, Houston, TX 77001', 6.0105, 6.9104, 'Houston', '123-456-7890', 'https://www.goodwill.org', 2),
(2, 'Salvation Army', '789 Renew Ln, Renew, TX 77002', 6.015, 6.92, 'Renew', '098-765-4321', 'https://www.salvationarmy.org', 2),
(3, 'Habitat for Humanity', '123 Greenway Blvd, Greenville, TX 77003', 6.02, 6.9005, 'Greenville', '456-789-0123', 'https://www.habitat.org', 2);



--
-- Data for Name: recycling_fact; Type: TABLE DATA; Schema: public; Owner: postgres
--

-- Replace the COPY for recycling_fact with INSERT statements
INSERT INTO public.recycling_fact (id, fact)
VALUES
(2, 'The average person generates over 4 pounds of trash every day and about 1.5 tons of solid waste per year.'),
(3, 'The average American uses 2,200 gallons of water per day.'),
(4, 'The average American uses 650 pounds of paper per year.'),
(5, 'The average American uses 650 pounds of paper per year.');



--
-- Data for Name: user_profile; Type: TABLE DATA; Schema: public; Owner: postgres
--

-- Replace the COPY for user_profile with INSERT statements
INSERT INTO public.user_profile (id, username, email, password, favorite_centers)
VALUES
(1, 'ebuka', 'conyekelu@yahoo.com', 'handsom@@', NULL);


--
-- Name: recycling_center_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.recycling_center_id_seq', 5, true);


--
-- Name: recycling_fact_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.recycling_fact_id_seq', 7, true);


--
-- Name: user_profile_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_profile_id_seq', 1, true);


--
-- Name: alembic_version alembic_version_pkc; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alembic_version
    ADD CONSTRAINT alembic_version_pkc PRIMARY KEY (version_num);


--
-- Name: recycling_center recycling_center_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recycling_center
    ADD CONSTRAINT recycling_center_pkey PRIMARY KEY (id);


--
-- Name: recycling_fact recycling_fact_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recycling_fact
    ADD CONSTRAINT recycling_fact_pkey PRIMARY KEY (id);


--
-- Name: user_profile user_profile_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_profile
    ADD CONSTRAINT user_profile_email_key UNIQUE (email);


--
-- Name: user_profile user_profile_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_profile
    ADD CONSTRAINT user_profile_pkey PRIMARY KEY (id);


--
-- Name: user_profile user_profile_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_profile
    ADD CONSTRAINT user_profile_username_key UNIQUE (username);


--
-- PostgreSQL database dump complete
--

