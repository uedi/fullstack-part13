CREATE TABLE blogs (
    id serial PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0
);

insert into blogs (url, title) values ('https://fi.wikipedia.org/', 'Wikipedia');
insert into blogs (author, url, title) values ('Dude', 'www.google.fi', 'Blog');