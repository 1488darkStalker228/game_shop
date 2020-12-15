const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport(
  {
    host: 'smtp.yandex.ru',
    port: 587,
    secure: false,
    auth: {
      user: 'Kakayanaxuypoct@yandex.ru',
      pass: '14881347x'
    }
  },
  {
    from: 'Game Shop <Kakayanaxuypoct@yandex.ru>',
  }
);

async function sendOrder(data, result) {

  let orderItems = '';
  let total = 0;

  for (let i = 0; i < result.length; i++) {
    orderItems += `
      <li>
        ${result[i]['title']} - ${data.key[result[i]['id']]} шт. На сумму: ${result[i]['price'] * data.key[result[i]['id']]};
      </li>
    `;
    total += result[i]['price'] * data.key[result[i]['id']];
  }

  const send = await transporter.sendMail(
    {
      to: data.email,
      subject: 'Order',
      html: ` 
      Здравствуйте, ${data.userName}!<br>
      Ваш заказ оформлен:<br>
      <hr>
      <ul>${orderItems}</ul>
      <hr>
      <b>Итого: ${total}</b>
    `
    }
  );
  return true;
}

module.exports = sendOrder;