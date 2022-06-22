//const img1 = require("../images/slider/slide_1.png").default
import img1 from "../images/slider/slide_1.png"
import img2 from "../images/slider/slide_2.png"
import img3 from "../images/slider/slide_3.png"


const heroSliderData = [
    {
        title: "MALM",
        description: "Дизайн без лишних деталей, который будет уместен как в спальне, так и в любой другой комнате. Ящики с плавным ходом. На ваш выбор предлагаются несколько вариантов отделки.",
        img: img1,
        color: "main",
        path: "/catalog/closet-01"
    },
    {
        title: "STEFAN",
        description: "Массив дерева – износостойкий натуральный материал.",
        img: img2,
        path: "/catalog/closet-02",
        color: "pink"
    },
    {
        title: "HEMNES",
        description: "Подходящий комод избавит вас от утренних поисков белья и носков. В нашем ассортименте комоды различных размеров, сочетающиеся с нашими гардеробами. Их можно поставить в любую комнату и даже в узкую прихожую. Для организации мелочей внутри ящиков отлично подойдут аксессуары для хранения.",
        img: img3,
        path: "/catalog/closet-03",
        color: "orange"
    }
]

export default heroSliderData