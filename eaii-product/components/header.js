import Head from 'next/head';

export default function Header(props) {
  let url = process.env.url;
  return (
    <Head>
      <title>{props.title}</title>
      <meta name="keywords" content={props.content} />
      <link rel="icon" href={props.icon} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:image" content={'/Logo.png'} />
      <meta property="og:title" content={props.title} />
      <meta property="og:type" content={props.type} />
      <meta property="og:description" content={props.description} />
      <meta property="og:image:width" content="2400" />
      <meta property="og:image:height" content="1260" />
    </Head>
  );
}

Header.defaultProps = {
  title: 'EAII-Products',
  icon: '../public/images/logo.png',
  content:
    'artificial intelligence, machine learning, deep learning, portfolio, projects, products',
  type: 'article',
  description: 'A webiste to show our projects',
};