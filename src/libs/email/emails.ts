const getActivateEmail = (url: string, otp: string) => {
    return `<html>
    <head>
        <title></title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <style type="text/css">
            /* CLIENT-SPECIFIC STYLES */
            body, table, td, a { 
                -webkit-text-size-adjust: 100%; 
                -ms-text-size-adjust: 100%; 
            }
            table, td { 
                mso-table-lspace: 0pt; 
                mso-table-rspace: 0pt; 
            }
            img { 
                -ms-interpolation-mode: bicubic; 
            }
            /* RESET STYLES */
            img { 
                border: 0; 
                height: auto; 
                line-height: 100%; 
                outline: none; 
                text-decoration: none; 
            }
            table { 
                border-collapse: 
                collapse !important; 
            }
            body { 
                height: 100% !important; 
                margin: 0 !important; 
                padding: 0 !important; 
                width: 100% !important; 
                font-family: 'Urbanist', sans-serif;
            }
            * {
                font-family: 'Urbanist', sans-serif;
            }
            /* iOS BLUE LINKS */
            a[x-apple-data-detectors] {
                color: inherit !important;
                text-decoration: none !important;
                font-size: inherit !important;
                font-family: inherit !important;
                font-weight: inherit !important;
                line-height: inherit !important;
            }
    
            /* ANDROID CENTER FIX */
            div[style*="margin: 16px 0;"] { 
                margin: 0 !important; 
            }
        </style>
        <link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
    </head>
    <body style="background-color: #242629; margin: 0 !important; padding: 0 !important;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-top: 4px solid #FF801E; border-bottom: 4px solid #0088A6;">
            <!-- LOGO -->
            <tr>
                <td bgcolor="#242629" align="center">
                    <table border="0" cellpadding="0" cellspacing="0" width="480" >
                        <tr>
                            <td align="center" valign="top" style="padding: 2rem 1rem;">
                                <img alt="Logo Softing" src="${process.env.APP_URL}/assets/logo.webp" width="180" style="display: block;" border="0">
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <!-- HERO -->
            <tr>
                <td bgcolor="#242629" align="center" style="padding: 0 1rem;">
                    <table border="0" cellpadding="0" cellspacing="0" width="480" >
                        <tr>
                            <td bgcolor="#fefefe" align="center" valign="top" style="padding: 2rem 1rem; border-radius: 1rem 1rem 0 0; color: #000; font-size: 48px; font-weight: 800; letter-spacing: 4px; line-height: 48px;">
                                <h1 style="font-size: 32px; font-weight: 900; margin: 0;">Verifica tu correo</h1>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <!-- COPY BLOCK -->
            <tr>
                <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="480" >
                        <!-- COPY -->
                        <tr>
                            <td bgcolor="#fefefe" align="left" style="padding: 1rem; color: #242629; font-size: 18px; font-weight: 400; line-height: 25px;" >
                                <p style="margin: 0; text-align: center;">
                                    Introduce este código en el navegador para verificar tu correo:
                                </p>
                            </td>
                        </tr>
                        <!-- CODE -->
                        <tr>
                            <td bgcolor="#fefefe" align="left" style="padding: 1rem; color: #242629; font-size: 18px; font-weight: 400; line-height: 25px;" >
                                <h2 style="font-size: 40px; font-weight: 700; margin: 0; text-align: center; margin-bottom: .5rem; color: #FF801E;">
                                    ${otp}
                                </h2>
                                <p style="margin: 0; text-align: center; font-size: small;">
                                    El código expirará en 30 minutos.
                                </p>
                            </td>
                        </tr>
                        <!-- BULLETPROOF BUTTON -->
                        <tr>
                            <td bgcolor="#fefefe " align="left">
                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                    <tr>
                                        <td bgcolor="#fefefe " align="center" style="padding: 2rem 2rem;">
                                            <table border="0" cellspacing="0" cellpadding="0">
                                                <tr>
                                                    <td align="center">                                                    
                                                        ¿Tienes problemas con el código? Usa 
                                                        <a
                                                            href="${url}" 
                                                            target="_blank" 
                                                            style="color: #FF801E;"
                                                        >
                                                            este enlace
                                                        </a>
                                                        para verificar tu correo.
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <!-- COPY CALLOUT -->
            <tr>
                <td bgcolor="#f4f4f4" align="center" style="padding: 0 1rem;">
                    <table border="0" cellpadding="0" cellspacing="0" width="480" >
                        <!-- HEADLINE -->
                        <tr>
                            <td bgcolor="#0088A6" align="center" style="padding: 2rem; color: #ffffff; text-align: center; font-size: 20px; font-weight: 600; line-height: 25px;" >
                                <h2 style="font-size: 24px; font-weight: 400; margin: 0;">
                                    ¿Quieres conocer más de Softing?
                                </h2>
                            </td>
                        </tr>
                        <!-- COPY -->
                        <tr>
                            <td bgcolor="#0088A6" align="left" style="padding: 0 2rem; color: #000; font-size: 18px; font-weight: 400; line-height: 25px;" >
                                <p style="margin: 0;">
                                    Da click en el siguiente enlace para conocer planes, tarifas, características y mucho más de Softing.
                                </p>
                            </td>
                        </tr>
                        <!-- COPY -->
                        <tr>
                            <td bgcolor="#0088A6" align="left" style="padding: 1rem 2rem 2rem; border-radius: 0 0 1rem 1rem; font-size: 18px; font-weight: 400; line-height: 25px;" >
                                <a href="https://www.Softing.com" target="_blank" style="color: #242629;">
                                    Softing
                                </a>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <!-- SUPPORT CALLOUT -->
            <tr>
                <td bgcolor="#f4f4f4" align="center" style="padding: 2rem;">
                    <table border="0" cellpadding="0" cellspacing="0" width="480" >
                        <!-- HEADLINE -->
                        <tr>
                            <td bgcolor="#0088A6" align="center" style="padding: 30px 30px 30px 30px; border-radius:1rem; font-size: 18px; font-weight: 400; line-height: 25px;" >
                                <h2 style="font-size: 20px; font-weight: 400; color: #000; margin: 0;">
                                    ¿Necesitas ayuda?
                                </h2>
                                <a href="mailto:Softingweb@gmail.com" style="color: #000;">
                                    Softingweb@gmail.com
                                </a>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <!-- FOOTER -->
            <tr>
                <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="480" >                    
                        <!-- PERMISSION REMINDER -->
                        <tr>
                            <td bgcolor="#f4f4f4" align="left" style="padding: 0px 30px 30px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;" >
                                <p style="margin: 0;">
                                    ¿No eres tú? Si no solicitaste un código para registrarte en Softing.com, puedes ignorar este correo de manera segura. No se realizará la creación de tu cuenta ni cobros.
                                </p>
                            </td>
                        </tr>                    
                        <!-- COPYRIGHT -->
                        <tr>
                            <td bgcolor="#f4f4f4" align="left" style="padding: 0px 30px 30px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;" >
                                <p style="margin: 0;">
                                    2024 Softing. All Rights Reserved. <br>
                                    Powered by Critic
                                </p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    `
}

export { getActivateEmail };