const Layouts = require("#Layouts");
const Framework = require("#Framework");


module.exports = {
  html: async (data) =>
    await Layouts.QuranLayout({
      head: await Framework.render`
			<title>ayah</title>`,

      content: await Framework.render`

<p class="arabic">${data.Arabic}</p>
				${async () => {

            return "".concat(
              ...(await Promise.all(
                data.Meal.map(async ([yazar, ayet]) => {
                  return `<p>${yazar} - ${ayet}</p>`;
                }),
              )),
            );

        }}
	<style>
    
    .arabic{
    direction:rtl;
    font-family: 'Amiri Quran', serif;
    font-weight: 400;
    font-size: 2rem;
  font-style: normal;
    
    }
    </style>

      `,
    }),
};
