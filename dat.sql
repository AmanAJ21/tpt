-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    email character varying(100) PRIMARY KEY,
    password character varying(100),
    name character varying(50),
    cname character varying(50),
    add character varying(100),
    num integer
);

ALTER TABLE public.users OWNER TO postgres;

--
-- Name: usars; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usars (
    users character varying(255) NOT NULL,
    srno character varying(255) NOT NULL,
    from_ character varying(255),
    tname character varying(255),
    to_ character varying(255),
    vnum character varying(255),
    rate character varying(255),
    bal integer,
    date date,
    oname character varying(255),
    size character varying(255),
    adv character varying(255),
    other character varying(255),
    rbal character varying(20),
    dbal character varying(255),
    FOREIGN KEY (users) REFERENCES public.users(email) ON DELETE CASCADE
);

ALTER TABLE public.usars OWNER TO postgres;

--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (email, password, name, cname, add, num) FROM stdin;
aman2@gmail.com	1234	aa	aa	aa	\N
8983061142aman@gmail.com	aman	aman	aman	aman	112233445
123@gmail.com	aman	Transport 	Transport	Transport	123456789
aman@gmail.com	1234	aaaa	aa	aa	898306114
aman123@gmail.com	AnXyuJzICq	\N	\N	\N	\N
aman3@gmail.com	aman	\N	\N	\N	\N
aman1@gmail.com	nv3bRcZdpK	11	aa	aaa	123456789
\.


--
-- Data for Name: usars; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usars (users, srno, from_, tname, to_, vnum, rate, bal, date, oname, size, adv, other, rbal, dbal) FROM stdin;
123@gmail.com	101	Pune	aa	Delhi	null	5000	1000	2014-10-08	bb	null	null	null	1	null
123@gmail.com	102	Pune	bb	Delhi	null	1000	555	2013-09-10	cc	null	null	null	0	null
123@gmail.com	103	Nagpur	cc	Delhi	null	1000	555	2013-09-10	dd	null	null	null	0	null
123@gmail.com	104	Nagpur	cc	Delhi	null	1000	555	2013-09-13	dd	null	null	null	1	null
123@gmail.com	105	Nagpur	ee	Gujrat	null	1000	555	2013-09-13	ee	null	null	null	1	null
123@gmail.com	106	Nagpur	ee	Gujrat	null	1000	555	2013-09-13	ff	null	null	null	0	null
123@gmail.com	107	Nagpur	ee	Gujrat	null	1000	555	2014-09-13	ff	null	null	null	0	null
123@gmail.com	108	Nagpur	aa	Gujrat	null	1000	555	2014-09-13	ff	null	null	null	0	null
123@gmail.com	109	Nagpur	aa	Gujrat	null	1000	555	2014-09-13	bb	null	null	null	1	null
123@gmail.com	110	Nagpur	aa	Gujrat	null	1000	555	2014-09-13	cc	null	null	null	1	null
8983061142aman@gmail.com	101	Pune	aa	Delhi	null	5000	1000	2014-10-08	bb	null	null	null	1	null
8983061142aman@gmail.com	102	Pune	bb	Delhi	null	1000	555	2013-09-10	cc	null	null	null	0	null
8983061142aman@gmail.com	103	Nagpur	cc	Delhi	null	1000	555	2013-09-10	dd	null	null	null	0	null
8983061142aman@gmail.com	104	Nagpur	cc	Delhi	null	1000	555	2013-09-13	dd	null	null	null	1	null
8983061142aman@gmail.com	105	Nagpur	ee	Gujrat	null	1000	555	2013-09-13	ee	null	null	null	1	null
8983061142aman@gmail.com	106	Nagpur	ee	Gujrat	null	1000	555	2013-09-13	ff	null	null	null	0	null
8983061142aman@gmail.com	107	Pune	aa	Delhi	null	1000	555	2014-09-13	ff	null	null	null	0	null
8983061142aman@gmail.com	108	Nagpur	aa	Gujrat	null	1000	555	2014-09-13	ff	null	null	null	0	null
8983061142aman@gmail.com	109	Nagpur	aa	Gujrat	null	1000	555	2014-09-13	bb	null	null	null	1	null
8983061142aman@gmail.com	110	Nagpur	aa	Gujrat	null	1000	555	2014-09-13	cc	null	null	null	1	null
8983061142aman@gmail.com	111	Pune	aa	Delhi	null	6000	1200	2014-10-09	bb	null	null	null	1	null
8983061142aman@gmail.com	112	Pune	bb	Delhi	null	2000	600	2013-09-11	cc	null	null	null	0	null
8983061142aman@gmail.com	113	Nagpur	cc	Delhi	null	2000	600	2013-09-12	dd	null	null	null	0	null
8983061142aman@gmail.com	114	Nagpur	cc	Delhi	null	2000	600	2013-09-14	dd	null	null	null	1	null
8983061142aman@gmail.com	115	Nagpur	ee	Gujrat	null	2000	600	2013-09-15	ee	null	null	null	1	null
8983061142aman@gmail.com	116	Nagpur	ee	Gujrat	null	2000	600	2013-09-16	ff	null	null	null	0	null
8983061142aman@gmail.com	117	Nagpur	ee	Gujrat	null	2000	600	2014-09-17	ff	null	null	null	0	null
8983061142aman@gmail.com	118	Nagpur	aa	Gujrat	null	2000	600	2014-09-18	ff	null	null	null	0	null
8983061142aman@gmail.com	119	Nagpur	aa	Gujrat	null	2000	600	2014-09-19	bb	null	null	null	1	null
8983061142aman@gmail.com	120	Nagpur	aa	Gujrat	null	2000	600	2014-09-20	cc	null	NULL	NULL	NULL	NULL
8983061142aman@gmail.com	121	Pune	aa	Delhi	null	7000	1400	2014-10-10	bb	null	null	null	1	null
8983061142aman@gmail.com	122	Pune	bb	Delhi	null	3000	700	2013-09-12	cc	null	null	null	0	null
8983061142aman@gmail.com	123	Nagpur	cc	Delhi	null	3000	700	2013-09-13	dd	null	null	null	0	null
8983061142aman@gmail.com	124	Nagpur	cc	Delhi	null	3000	700	2013-09-15	dd	null	null	null	1	null
8983061142aman@gmail.com	125	Nagpur	ee	Gujrat	null	3000	700	2013-09-16	ee	null	null	null	1	null
8983061142aman@gmail.com	126	Nagpur	ee	Gujrat	null	3000	700	2013-09-17	ff	null	null	null	0	null
8983061142aman@gmail.com	127	Nagpur	ee	Gujrat	null	3000	700	2014-09-18	ff	null	null	null	0	null
8983061142aman@gmail.com	128	Nagpur	aa	Gujrat	null	3000	700	2014-09-19	ff	null	null	null	0	null
8983061142aman@gmail.com	129	Nagpur	aa	Gujrat	null	3000	700	2014-09-20	bb	null	NULL	NULL	NULL	null
8983061142aman@gmail.com	136	Pune	aa	Delhi	null	9000	1800	2014-10-12	bb	null	null	null	1	null
8983061142aman@gmail.com	137	Pune	bb	Delhi	null	5000	900	2013-09-15	cc	null	null	null	0	null
8983061142aman@gmail.com	138	Nagpur	cc	Delhi	null	5000	900	2013-09-16	dd	null	null	null	0	null
8983061142aman@gmail.com	139	Nagpur	cc	Delhi	null	5000	900	2013-09-17	dd	null	null	null	1	null
8983061142aman@gmail.com	140	Nagpur	ee	Gujrat	null	5000	900	2013-09-18	ee	null	null	null	1	null
8983061142aman@gmail.com	141	Nagpur	ee	Gujrat	null	5000	900	2013-09-19	ff	null	null	null	0	null
8983061142aman@gmail.com	142	Nagpur	ee	Gujrat	null	5000	900	2014-09-20	ff	null	null	null	0	null
8983061142aman@gmail.com	143	Nagpur	aa	Gujrat	null	5000	900	2014-09-21	ff	null	null	null	0	null
8983061142aman@gmail.com	144	Nagpur	aa	Gujrat	null	5000	900	2014-09-22	bb	null	null	null	1	null
8983061142aman@gmail.com	145	Nagpur	aa	Gujrat	null	5000	900	2014-09-23	cc	null	null	null	1	null
8983061142aman@gmail.com	146	Pune	aa	Delhi	null	10000	2000	2014-10-13	bb	null	null	null	1	null
8983061142aman@gmail.com	147	Pune	bb	Delhi	null	6000	1000	2013-09-16	cc	null	null	null	0	null
8983061142aman@gmail.com	148	Nagpur	cc	Delhi	null	6000	1000	2013-09-17	dd	null	null	null	0	null
8983061142aman@gmail.com	149	Nagpur	cc	Delhi	null	6000	1000	2013-09-18	dd	null	null	null	1	null
8983061142aman@gmail.com	150	Nagpur	ee	Gujrat	null	6000	1000	2013-09-19	ee	null	null	null	1	null
8983061142aman@gmail.com	151	Nagpur	ee	Gujrat	null	6000	1000	2013-09-20	ff	null	null	null	0	null
8983061142aman@gmail.com	152	Nagpur	ee	Gujrat	null	6000	1000	2014-09-21	ff	null	null	null	0	null
8983061142aman@gmail.com	153	Nagpur	aa	Gujrat	null	6000	1000	2014-09-22	ff	null	null	null	0	null
8983061142aman@gmail.com	154	Nagpur	aa	Gujrat	null	6000	1000	2014-09-23	bb	null	NULL	NULL	NULL	NULL
123@gmail.com	210	Pune	aa	Delhi	null	5000	1000	2014-10-08	bb	null	null	null	1	null
123@gmail.com	211	Pune	bb	Delhi	null	1000	555	2013-09-10	cc	null	null	null	0	null
123@gmail.com	212	Nagpur	cc	Delhi	null	1000	555	2013-09-10	dd	null	null	null	0	null
123@gmail.com	213	Nagpur	cc	Delhi	null	1000	555	2013-09-13	dd	null	null	null	1	null
123@gmail.com	214	Nagpur	ee	Gujrat	null	1000	555	2013-09-13	ee	null	null	null	1	null
123@gmail.com	215	Nagpur	ee	Gujrat	null	1000	555	2013-09-13	ff	null	null	null	0	null
123@gmail.com	216	Nagpur	ee	Gujrat	null	1000	555	2014-09-13	ff	null	null	null	0	null
123@gmail.com	217	Nagpur	aa	Gujrat	null	1000	555	2014-09-13	ff	null	null	null	0	null
123@gmail.com	218	Nagpur	aa	Gujrat	null	1000	555	2014-09-13	bb	null	null	null	1	null
123@gmail.com	219	Nagpur	aa	Gujrat	null	1000	555	2014-09-13	cc	null	null	null	1	null
123@gmail.com	220	Pune	aa	Delhi	null	6000	1200	2014-10-09	bb	null	null	null	1	null
123@gmail.com	221	Pune	bb	Delhi	null	2000	600	2013-09-11	cc	null	null	null	0	null
123@gmail.com	222	Nagpur	cc	Delhi	null	2000	600	2013-09-12	dd	null	null	null	0	null
123@gmail.com	223	Nagpur	cc	Delhi	null	2000	600	2013-09-14	dd	null	null	null	1	null
123@gmail.com	224	Nagpur	ee	Gujrat	null	2000	600	2013-09-15	ee	null	null	null	1	null
123@gmail.com	225	Nagpur	ee	Gujrat	null	2000	600	2013-09-16	ff	null	null	null	0	null
123@gmail.com	226	Nagpur	ee	Gujrat	null	2000	600	2014-09-17	ff	null	null	null	0	null
123@gmail.com	227	Nagpur	aa	Gujrat	null	2000	600	2014-09-18	ff	null	null	null	0	null
123@gmail.com	228	Nagpur	aa	Gujrat	null	2000	600	2014-09-19	bb	null	null	null	1	null
123@gmail.com	229	Nagpur	aa	Gujrat	null	2000	600	2014-09-20	cc	null	NULL	NULL	NULL	NULL
123@gmail.com	230	Pune	aa	Delhi	null	7000	1400	2014-10-10	bb	null	null	null	1	null
123@gmail.com	231	Pune	bb	Delhi	null	3000	700	2013-09-12	cc	null	null	null	0	null
123@gmail.com	232	Nagpur	cc	Delhi	null	3000	700	2013-09-13	dd	null	null	null	0	null
123@gmail.com	233	Nagpur	cc	Delhi	null	3000	700	2013-09-15	dd	null	null	null	1	null
123@gmail.com	234	Nagpur	ee	Gujrat	null	3000	700	2013-09-16	ee	null	null	null	1	null
123@gmail.com	235	Nagpur	ee	Gujrat	null	3000	700	2013-09-17	ff	null	null	null	0	null
123@gmail.com	236	Nagpur	ee	Gujrat	null	3000	700	2014-09-18	ff	null	null	null	0	null
123@gmail.com	237	Nagpur	aa	Gujrat	null	3000	700	2014-09-19	ff	null	null	null	0	null
123@gmail.com	238	Nagpur	aa	Gujrat	null	3000	700	2014-09-20	bb	null	NULL	NULL	NULL	null
123@gmail.com	239	Pune	aa	Delhi	null	9000	1800	2014-10-12	bb	null	null	null	1	null
123@gmail.com	240	Pune	bb	Delhi	null	5000	900	2013-09-15	cc	null	null	null	0	null
123@gmail.com	241	Nagpur	cc	Delhi	null	5000	900	2013-09-16	dd	null	null	null	0	null
123@gmail.com	242	Nagpur	cc	Delhi	null	5000	900	2013-09-17	dd	null	null	null	1	null
123@gmail.com	243	Nagpur	ee	Gujrat	null	5000	900	2013-09-18	ee	null	null	null	 1	null
123@gmail.com	244	Nagpur	ee	Gujrat	null	5000	900	2013-09-19	ff	null	null	null	0	null
123@gmail.com	245	Nagpur	ee	Gujrat	null	5000	900	2014-09-20	ff	null	null	null	0	null
123@gmail.com	246	Nagpur	aa	Gujrat	null	5000	900	2014-09-21	ff	null	null	null	0	null
123@gmail.com	247	Nagpur	aa	Gujrat	null	5000	900	2014-09-22	bb	null	null	null	1	null
123@gmail.com	248	Nagpur	aa	Gujrat	null	5000	900	2014-09-23	cc	null	null	null	1	null
123@gmail.com	249	Pune	aa	Delhi	null	10000	2000	2014-10-13	bb	null	null	null	1	null
123@gmail.com	250	Pune	bb	Delhi	null	6000	1000	2013-09-16	cc	null	null	null	0	null
123@gmail.com	251	Nagpur	cc	Delhi	null	6000	1000	2013-09-17	dd	null	null	null	0	null
123@gmail.com	252	Nagpur	cc	Delhi	null	6000	1000	2013-09-18	dd	null	null	null	1	null
123@gmail.com	253	Nagpur	ee	Gujrat	null	6000	1000	2013-09-19	ee	null	null	null	1	null
123@gmail.com	254	Nagpur	ee	Gujrat	null	6000	1000	2013-09-20	ff	null	null	null	0	null
123@gmail.com	255	Nagpur	ee	Gujrat	null	6000	1000	2014-09-21	ff	null	null	null	0	null
123@gmail.com	256	Nagpur	aa	Gujrat	null	6000	1000	2014-09-22	ff	null	null	null	0	null
123@gmail.com	257	Nagpur	aa	Gujrat	null	6000	1000	2014-09-23	bb	null	NULL	NULL	NULL	NULL
\.


--
-- PostgreSQL database dump complete
--