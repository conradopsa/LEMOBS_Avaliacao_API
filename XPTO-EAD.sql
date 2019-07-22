--- public.aluno
CREATE TABLE public.aluno
(
  id serial NOT NULL,
  nome character varying(100) NOT NULL,
  data_nascimento date NOT NULL,
  created_at timestamp,
  updated_at timestamp,
  deleted_at timestamp,
  PRIMARY KEY (id)
);
INSERT INTO public.aluno (nome, data_nascimento, created_at) VALUES ('Yuri Silva', '2000-01-01', now());
INSERT INTO public.aluno (nome, data_nascimento, created_at) VALUES ('Luiz Claudio', '01/01/2000', now());

--- public.professor
CREATE TABLE public.professor
(
  id serial NOT NULL,
  nome character varying(100) NOT NULL,
  created_at timestamp,
  updated_at timestamp,
  deleted_at timestamp,
  PRIMARY KEY (id)
);
INSERT INTO public.professor (nome, created_at) VALUES ('Garibaldo da Silva', now());

--- public.curso
CREATE TABLE public.curso
(
  id serial NOT NULL,
  professor_id integer NOT NULL,
  titulo character varying(200) NOT NULL,
  descricao text NOT NULL,
  created_at timestamp,
  updated_at timestamp,
  deleted_at timestamp,
  PRIMARY KEY (id),
  CONSTRAINT fk_curso_professor FOREIGN KEY (professor_id)
      REFERENCES public.professor (id) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE CASCADE
);
CREATE INDEX idx_curso_professor_id ON public.curso (professor_id);
INSERT INTO public.curso (professor_id, titulo, descricao, created_at) VALUES (1, 'Introdução ao Node.js', 'Curso de introdução ao Node.js, utilizando o framework express e projeto swagger.', now());

--- public.aula
CREATE TABLE public.aula
(
  id serial NOT NULL,
  curso_id integer NOT NULL,
  titulo character varying(200) NOT NULL,
  conteudo text NOT NULL,
  created_at timestamp,
  updated_at timestamp,
  deleted_at timestamp,
  PRIMARY KEY (id),
  CONSTRAINT fk_aula_curso FOREIGN KEY (curso_id)
      REFERENCES public.curso (id) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE CASCADE
);
CREATE INDEX idx_aula_curso_id ON public.aula (curso_id);
INSERT INTO public.aula (curso_id, titulo, conteudo, created_at) VALUES (1, 'Aula 1 - Introdução ao Node.js', 'Conteúdo da primeira aula.', now());
INSERT INTO public.aula (curso_id, titulo, conteudo, created_at) VALUES (1, 'Aula 2 - Gerenciamento de pacotes usando NPM', 'Conteúdo da segunda aula.', now());

--- public.curso_aluno
CREATE TABLE public.curso_aluno
(
  curso_id integer NOT NULL,
  aluno_id integer NOT NULL,
  PRIMARY KEY (curso_id, aluno_id),
  CONSTRAINT fk_curso_aluno_cu FOREIGN KEY (curso_id)
      REFERENCES public.curso (id) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_curso_aluno_al FOREIGN KEY (aluno_id)
      REFERENCES public.aluno (id) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE CASCADE
);
CREATE INDEX idx_curso_aluno_curso_id ON public.curso_aluno (curso_id);
CREATE INDEX idx_curso_aluno_aluno_id ON public.curso_aluno (aluno_id);
INSERT INTO public.curso_aluno (curso_id, aluno_id) VALUES (1, 1);
INSERT INTO public.curso_aluno (curso_id, aluno_id) VALUES (1, 2);
