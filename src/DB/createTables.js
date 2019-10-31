/* eslint-disable no-console */
import DB from '.';

const dropTablesComments = 'DROP TABLE IF EXISTS comments CASCADE';
const createTableComments = `CREATE TABLE comments(
  id bigserial NOT NULL,
  employeeID bigserial,
  articleID bigserial,
  gifID bigserial,
  createdOn timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
  comment character varying NOT NULL,
  CONSTRAINT comment_pkey PRIMARY KEY(id),
  CONSTRAINT comment_user_fkey FOREIGN KEY(employeeID)
    REFERENCES employees,
  CONSTRAINT comment_article_id_fkey FOREIGN KEY(articleID)
    REFERENCES articles,
  CONSTRAINT comment_gif_id_fkey FOREIGN KEY(gifID)
    REFERENCES gifs
)`;

const dropTablesGifs = 'DROP TABLE IF EXISTS gifs CASCADE';
const createTableGifs = `CREATE TABLE gifs(
  id bigserial NOT NULL,
  employeeID bigserial,
  createdOn timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
  title character varying(100) NOT NULL,
  url character varying NOT NULL,
  CONSTRAINT gif_pkey PRIMARY KEY(id),
  CONSTRAINT gif_employee_fkey FOREIGN KEY(employeeID)
    REFERENCES employees
)`;

const dropTablesArticles = 'DROP TABLE IF EXISTS articles CASCADE';
const createTableArticles = `CREATE TABLE articles(
  id bigserial NOT NULL,
  authorID bigserial,
  articleTitle character varying(100) NOT NULL,
  createdOn timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
  article character varying NOT NULL,
  CONSTRAINT article_pkey PRIMARY KEY(id),
  CONSTRAINT article_employee_fkey FOREIGN KEY(authorID)
    REFERENCES employees
)`;

const dropTableEmployees = 'DROP TABLE IF EXISTS employees CASCADE';
const createTableEmployees = `CREATE TABLE employees(
  id bigserial NOT NULL,
  firstName character varying(50) NOT NULL,
  lastName character varying(50),
  gender character varying (15),
  jobRole character varying (60),
  email character varying (100) NOT NULL,
  password character varying NOT NULL,
  department character varying (100),
  address character varying,
  CONSTRAINT employee_pkey PRIMARY KEY(id)
)`;

class CreateTables {
  static async create() {
    await DB.query(dropTableEmployees);
    await DB.query(dropTablesArticles);
    await DB.query(dropTablesGifs);
    await DB.query(dropTablesComments);

    await DB.query(createTableEmployees);
    await DB.query(createTableGifs);
    await DB.query(createTableArticles);
    await DB.query(createTableComments);
  }
}

CreateTables.create().catch(err => console.log('ERROR OCCURED', err));
