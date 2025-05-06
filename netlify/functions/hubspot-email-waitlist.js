const fetch = require("node-fetch");

exports.handler = async (event) => {
  try {
    const { email } = JSON.parse(event.body);

    if (!email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Falta el email" }),
      };
    }

    // Reemplaza con tu HubSpot Form ID y Portal ID
    const HUBSPOT_PORTAL_ID = process.env.HUBSPOT_PORTAL_ID;  // Usa variables de entorno para seguridad
    const HUBSPOT_FORM_ID = process.env.HUBSPOT_FORM_ID;

    // Este endpoint es para Forms API
    const url = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`;

    const payload = {
      fields: [
        {
          name: "email",
          value: email,
        },
      ],
      context: {
        pageUri: "https://www.huvi.co.il",
        pageName: "Coming Soon - Huvi",
      },
    };

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("HubSpot error:", error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Error al enviar a HubSpot" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    console.error("Server error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error interno del servidor" }),
    };
  }
};