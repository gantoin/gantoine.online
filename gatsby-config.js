module.exports = {
    siteMetadata: {
        name: ``,
        title: `gantoin.online`,
        date: `2021`,
    },
    plugins: [
        `gatsby-plugin-layout`,
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-offline`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `slides`,
                path: `${__dirname}/src/slides`,
            },
        },
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    `gatsby-remark-copy-linked-files`,
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            // It's important to specify the maxWidth (in pixels) of
                            // the content container as this plugin uses this as the
                            // base for generating different widths of each image.
                            maxWidth: 1920,
                        },
                    },
                ],
            },
        },
        `gatsby-transformer-sharp`,
        {
            resolve: `gatsby-plugin-sharp`,
            options: {
                icon: `src/images/gatsby-icon.png`,
                defaults: {},
                // Set to false to allow builds to continue on image errors
                failOnError: true,
                // deprecated options and their defaults:
                base64Width: 20,
                forceBase64Format: `png`, // valid formats: png,jpg,webp
                useMozJpeg: process.env.GATSBY_JPEG_ENCODER === `MOZJPEG`,
                stripMetadata: true,
                defaultQuality: 50,
            },
        },
    ],
};
