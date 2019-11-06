/* eslint-disable no-console */
import DB from '.';

const dropCommentsArticles = 'DROP TABLE IF EXISTS comments_articles CASCADE';
const createTableCommentsArticles = `CREATE TABLE comments_articles(
  id bigserial NOT NULL,
  employeeID bigserial,
  articleID bigserial,
  createdOn timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
  comment character varying NOT NULL,
  CONSTRAINT comment_article_pkey PRIMARY KEY(id),
  CONSTRAINT comment_article_user_fkey FOREIGN KEY(employeeID)
    REFERENCES employees,
  CONSTRAINT comment_article_id_fkey FOREIGN KEY(articleID)
    REFERENCES articles
)`;

const dropTablesCommentsGifs = 'DROP TABLE IF EXISTS comments_gifs CASCADE';
const createTableCommentsGifs = `CREATE TABLE comments_gifs(
  id bigserial NOT NULL,
  employeeID bigserial,
  gifID bigserial,
  createdOn timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
  comment character varying NOT NULL,
  CONSTRAINT comment_gif_pkey PRIMARY KEY(id),
  CONSTRAINT comment_gif_user_fkey FOREIGN KEY(employeeID)
    REFERENCES employees,
  CONSTRAINT comment_gif_id_fkey FOREIGN KEY(gifID)
    REFERENCES gifs
)`;

const dropTablesGifs = 'DROP TABLE IF EXISTS gifs CASCADE';
const createTableGifs = `CREATE TABLE gifs(
  gifId bigserial NOT NULL,
  employeeID bigserial,
  createdOn timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
  title character varying(100) NOT NULL,
  image_url character varying NOT NULL,
  CONSTRAINT gif_pkey PRIMARY KEY(gifId),
  CONSTRAINT employee_id_user_idfkey FOREIGN KEY(employeeID)
    REFERENCES employees
)`;

const dropTablesArticles = 'DROP TABLE IF EXISTS articles CASCADE';
const createTableArticles = `CREATE TABLE articles(
  articleId bigserial NOT NULL,
  employeeID bigserial,
  title character varying(100) NOT NULL,
  createdOn timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
  article character varying NOT NULL,
  CONSTRAINT article_pkey PRIMARY KEY(articleId),
  CONSTRAINT employee_id_user_idfkey FOREIGN KEY(employeeID)
    REFERENCES employees
)`;

const dropTableEmployees = 'DROP TABLE IF EXISTS employees CASCADE';
const createTableEmployees = `CREATE TABLE employees(
  id bigserial NOT NULL,
  firstName character varying(50),
  lastName character varying(50),
  gender character varying (15),
  jobRole character varying (60) NOT NULL,
  email character varying (100) NOT NULL,
  password character varying NOT NULL,
  department character varying (100),
  address character varying,
  CONSTRAINT employee_pkey PRIMARY KEY(id),
  CONSTRAINT employee_email UNIQUE(email)
)`;

class CreateTables {
  static async create() {
    await DB.query(dropTableEmployees);
    await DB.query(dropTablesArticles);
    await DB.query(dropTablesGifs);
    await DB.query(dropTablesCommentsGifs);
    await DB.query(dropCommentsArticles);

    await DB.query(createTableEmployees);
    await DB.query(createTableGifs);
    await DB.query(createTableArticles);
    await DB.query(createTableCommentsArticles);
    await DB.query(createTableCommentsGifs);
  }
}

CreateTables.create().catch(err => console.log('ERROR OCCURED', err));
