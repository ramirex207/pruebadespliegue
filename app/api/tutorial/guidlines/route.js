import { NextResponse } from "next/server";
import {generatePrompt} from '@utils/prompts'
    export async function POST(request){
        let totalReviews = "";
        for( let i = 0; i<reviews.length; i++){
            const prompt = `Tu tarea es generar un breve resumen de una reseña de 
                            producto de un sitio de comercio electrónico. 
                            Resume la siguiente reseña, delimitada por triple comillas dobles, en un máximo de 20 palabras.
                            Reseña: """${reviews[i]}"""
                            `;
            const response = await generatePrompt(prompt)
            
            totalReviews = totalReviews + response + '\n';
        }
        console.log(totalReviews)
        return NextResponse.json({result :totalReviews, status:200})
        
    }



//constantes 
const review_1 = `Obtuve este peluche de panda para el cumpleaños de mi hija, a quien le encanta y lo lleva a todas partes. Es suave y súper lindo, y su cara tiene una expresión amigable. Sin embargo, es un poco pequeño para lo que pagué. Creo que podría haber otras opciones más grandes por el mismo precio. Llegó un día antes de lo esperado, así que pude jugar con él yo mismo antes de dárselo a ella.`
const review_2 = `Necesitaba una bonita lámpara para mi dormitorio, y esta tenía almacenamiento adicional y un precio razonable. La recibí rápidamente, llegó en 2 días. La cuerda de la lámpara se rompió durante el transporte, pero la compañía amablemente envió una nueva. También llegó en pocos días. Fue fácil de armar. Luego me faltaba una pieza, así que me puse en contacto con su servicio de atención al cliente y rápidamente me enviaron la pieza que faltaba. Me parece una gran compañía que se preocupa por sus clientes y productos.`
const review_3 = `Mi higienista dental me recomendó un cepillo de dientes eléctrico, por eso adquirí este. Hasta ahora, la duración de la batería parece ser bastante impresionante. Después de la carga inicial y dejar el cargador conectado durante la primera semana para acondicionar la batería, he desconectado el cargador y lo he estado utilizando para cepillarme dos veces al día durante las últimas 3 semanas con la misma carga. Sin embargo, el cabezal del cepillo de dientes es demasiado pequeño. He visto cepillos de dientes para bebés más grandes que este. Desearía que el cabezal fuera más grande y tuviera cerdas de diferentes longitudes para llegar mejor entre los dientes, porque este no lo logra. En general, si puedes conseguir este por alrededor de $50, es una buena oferta. Los cabezales de repuesto del fabricante son bastante caros, pero puedes encontrar genéricos a un precio más razonable. ¡Este cepillo de dientes hace que sienta que he ido al dentista todos los días! ¡Mis dientes se sienten limpios y relucientes!`
const review_4 = `Así que, aún tenían el sistema de 17 piezas en oferta de temporada por alrededor de $49 en el mes de noviembre, con un descuento de aproximadamente la mitad del precio original. Sin embargo, por alguna razón (llámalo aumento de precios abusivo), alrededor de la segunda semana de diciembre, los precios subieron a alrededor de $70-$89 para el mismo sistema. Y el sistema de 11 piezas también aumentó unos $10 desde el precio de oferta anterior de $29. En apariencia está bien, pero si observas la base, la parte donde la cuchilla se encaja no se ve tan bien como en ediciones anteriores de hace unos años. Sin embargo, planeo ser muy cuidadoso con ella (por ejemplo, trituro ingredientes duros como frijoles, hielo, arroz, etc., en la licuadora primero y luego los pulverizo en el tamaño de porción deseado en la licuadora, luego cambio a la cuchilla para batir para obtener una harina más fina, y uso la cuchilla de corte en cruz primero al hacer batidos y luego uso la cuchilla plana si necesito que estén más finos/menos pulposos). Un consejo especial al hacer batidos es cortar finamente y congelar las frutas y verduras (si usas espinacas, ablanda ligeramente las espinacas en una cocción suave, luego congélalas hasta que estén listas para usar; y si haces sorbetes, usa un procesador de alimentos pequeño o mediano) que planeas utilizar, de esta manera puedes evitar agregar tanta cantidad de hielo, si es que lo añades, cuando hagas tu batido. Después de aproximadamente un año, el motor comenzó a hacer un ruido extraño. Llamé al servicio de atención al cliente, pero la garantía ya había expirado, así que tuve que comprar otro. Solo para tu información: la calidad general ha disminuido en este tipo de productos, por lo que están confiando en el reconocimiento de marca y la lealtad de los consumidores para mantener las ventas. Lo recibí en aproximadamente dos días.`
const review_5 = `Recientemente adquirí esta laptop y estoy muy impresionado con su rendimiento y características. El diseño es elegante y moderno, con una pantalla nítida y colores vibrantes. El procesador de última generación garantiza un rendimiento rápido y fluido, incluso al realizar tareas exigentes. La duración de la batería es sorprendente, lo que me permite trabajar durante horas sin necesidad de recargar. Además, el almacenamiento es más que suficiente para guardar todos mis archivos y programas.

El teclado es cómodo de usar, con teclas bien espaciadas y retroiluminación ajustable. El trackpad también es muy preciso y sensible al tacto. La laptop cuenta con puertos USB y HDMI, lo que facilita la conexión de periféricos y la conexión a pantallas externas.

La calidad de construcción es excelente y se nota que la laptop está diseñada para durar. Además, el sistema de enfriamiento mantiene la temperatura bajo control incluso en momentos de uso intensivo.

En general, estoy extremadamente satisfecho con mi compra y recomendaría esta laptop a cualquiera que busque un equilibrio perfecto entre rendimiento, estilo y durabilidad`

const reviews = [review_1, review_2, review_3, review_4, review_5]
