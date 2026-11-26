import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='fr'>
      <Head>
        <meta name='description' content='Gestion de tickets en temps réel : employés, techniciens et administrateur' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
