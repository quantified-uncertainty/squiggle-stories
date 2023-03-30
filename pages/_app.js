// import 'tailwindcss/tailwind.css'
import "tailwindcss/tailwind.css";
import "../styles/globals.css";

import Head from "next/head";

function MyApp({Component, pageProps}) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-50">
            {/* Webpage name & favicon */}
            <div className="mt-0">
                <Head>
                    <title>Squiggle tweaker</title>
                    <link rel="icon" href="/favicon.ico"/>
                </Head>
                {/* Content */}
                <main className="inline flex-col items-center w-full flex-1 px-20 text-center">
                    <Component {...pageProps}/>
                </main>
            </div>
        </div>
    );
}

export default MyApp;
