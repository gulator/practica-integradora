import mongoose from "mongoose";
import { productModel } from "./src/dao/models/product.model.js";

const ordenes = async ()=>{
    await mongoose.connect(
        "mongodb+srv://jdascanio:jdascaniocoderback@cluster43330.crt6quf.mongodb.net/ecommerce?retryWrites=true&w=majority"
      );
        // let productos = await productModel.paginate({brand:{$in: ['Nike','Puma']}},{limit: 25})

    //   let productos = await productModel.aggregate([
        
    //     {
    //         $project: {_id: '$brand', priceAvg: {$avg: '$price'}, stock: {$sum: '$stock'}}
    //         // $project: {_id: '$brand', avg: {$avg: '$price'}, total: { $multiply: [ "$price", "$quantity" ] }}
    //     },
    //     {
    //         $group: {_id: '$_id', priceAvg: {$avg: '$priceAvg'}, stock:{$sum: '$stock'}}
    //     },
    //     {
    //         $sort: {priceAvg: -1}
    //     }
    //     // {
    //     //     $group: {_id: '$name', totalQuantity: {$sum: '$quantity'}, totalAmount: {$multiply: ["$price", "$quantity"]}}
    //     // }
    //   ])
       
    //   console.log({'payload':orders.docs, ...orders}),
    let productos = await productModel.updateMany(
      { }, // Empty filter to match all documents
      { $set: { available: { $gt: ['$stock', 0] } } }, // Set 'available' to true if 'stock' is greater than 0
      { multi: true } // Update multiple documents
    )
//     let productos = await productModel.insertMany (
//         [
//             {title: 'Remera Asics Camel Microfibra', price:7450, brand:'Asics', color:'Camel', code: '127578', stock: 15},
// {title: 'Calza Corta Adidas Blanca CoolMax', price:9640, brand:'Adidas', color:'Blanca', code: '120034', stock: 3},
// {title: 'Remera Adidas Negra CoolMax', price:7195, brand:'Adidas', color:'Negra', code: '180140', stock: 9},
// {title: 'Remera Nike Blanca Polyester', price:8720, brand:'Nike', color:'Blanca', code: '179623', stock: 10},
// {title: 'Remera Adidas Gris Algodon', price:7650, brand:'Adidas', color:'Gris', code: '184339', stock: 0},
// {title: 'Calza Corta Puma Rojo Polyester', price:8645, brand:'Puma', color:'Rojo', code: '188339', stock: 13},
// {title: 'Remera Reebok Blanca Polyester', price:9705, brand:'Reebok', color:'Blanca', code: '138435', stock: 6},
// {title: 'Calza Corta Nike Gris CoolMax', price:7410, brand:'Nike', color:'Gris', code: '177217', stock: 8},
// {title: 'Calza Larga Asics Gris Polyester', price:9155, brand:'Asics', color:'Gris', code: '103835', stock: 10}, 
// {title: 'Calza Larga Adidas Gris CoolMax', price:9945, brand:'Adidas', color:'Gris', code: '117656', stock: 15},
// {title: 'Short Asics Blanca Microfibra', price:7175, brand:'Asics', color:'Blanca', code: '105783', stock: 11},
// {title: 'Calza Corta Reebok Camel Dry fit', price:8890, brand:'Reebok', color:'Camel', code: '161729', stock: 9},
// {title: 'Calza Larga Reebok Blanca Polyester', price:9320, brand:'Reebok', color:'Blanca', code: '154891', stock: 2},
// {title: 'Remera Puma Negra Microfibra', price:7535, brand:'Puma', color:'Negra', code: '130266', stock: 13},
// {title: 'Calza Corta Asics Rojo Algodon', price:7915, brand:'Asics', color:'Rojo', code: '185533', stock: 11},   
// {title: 'Calza Corta Asics Blanca CoolMax', price:8865, brand:'Asics', color:'Blanca', code: '101203', stock: 11},
// {title: 'Calza Corta Asics Gris Dry fit', price:7410, brand:'Asics', color:'Gris', code: '153343', stock: 6},
// {title: 'Calza Larga Asics Gris CoolMax', price:8340, brand:'Asics', color:'Gris', code: '113724', stock: 9} ,    
// {title: 'Short Puma Negra CoolMax', price:7770, brand:'Puma', color:'Negra', code: '143704', stock: 15},
// {title: 'Calza Corta Puma Rojo CoolMax', price:9525, brand:'Puma', color:'Rojo', code: '166708', stock: 17},
// {title: 'Calza Larga Adidas Rojo CoolMax', price:9920, brand:'Adidas', color:'Rojo', code: '106865', stock: 20},
// {title: 'Calza Corta Nike Camel Dry fit', price:7455, brand:'Nike', color:'Camel', code: '100297', stock: 18},
// {title: 'Pantalon Reebok Blanca CoolMax', price:7245, brand:'Reebok', color:'Blanca', code: '131763', stock: 9},
// {title: 'Pantalon Nike Blanca Algodon', price:8830, brand:'Nike', color:'Blanca', code: '129767', stock: 0},
// {title: 'Short Nike Camel Algodon', price:9590, brand:'Nike', color:'Camel', code: '187976', stock: 20},
// {title: 'Short Nike Blanca Algodon', price:7265, brand:'Nike', color:'Blanca', code: '116343', stock: 19},
// {title: 'Remera Puma Negra Algodon', price:8925, brand:'Puma', color:'Negra', code: '111995', stock: 8},
// {title: 'Short Adidas Gris Microfibra', price:9350, brand:'Adidas', color:'Gris', code: '159578', stock: 14},
// {title: 'Short Adidas Rojo CoolMax', price:8870, brand:'Adidas', color:'Rojo', code: '126953', stock: 6},
// {title: 'Pantalon Reebok Blanca Polyester', price:8375, brand:'Reebok', color:'Blanca', code: '118965', stock: 7},
// {title: 'Calza Larga Asics Camel Algodon', price:8070, brand:'Asics', color:'Camel', code: '149310', stock: 16},
// {title: 'Calza Corta Puma Blanca CoolMax', price:7855, brand:'Puma', color:'Blanca', code: '110821', stock: 9},
// {title: 'Pantalon Puma Blanca Microfibra', price:9260, brand:'Puma', color:'Blanca', code: '182132', stock: 3},
// {title: 'Short Asics Camel Dry fit', price:8195, brand:'Asics', color:'Camel', code: '175464', stock: 7},
// {title: 'Calza Larga Nike Camel CoolMax', price:7710, brand:'Nike', color:'Camel', code: '145427', stock: 13},
// {title: 'Calza Larga Nike Gris Dry fit', price:9630, brand:'Nike', color:'Gris', code: '116655', stock: 15},
// {title: 'Calza Larga Nike Blanca Microfibra', price:7035, brand:'Nike', color:'Blanca', code: '179481', stock: 13},
// {title: 'Remera Puma Negra Dry fit', price:7180, brand:'Puma', color:'Negra', code: '177158', stock: 14},
// {title: 'Pantalon Puma Camel Dry fit', price:7365, brand:'Puma', color:'Camel', code: '158481', stock: 13},
// {title: 'Calza Larga Asics Gris Microfibra', price:9615, brand:'Asics', color:'Gris', code: '121059', stock: 13},
// {title: 'Pantalon Adidas Gris Polyester', price:7485, brand:'Adidas', color:'Gris', code: '198588', stock: 8},
// {title: 'Pantalon Nike Blanca Dry fit', price:9215, brand:'Nike', color:'Blanca', code: '102363', stock: 8},
// {title: 'Short Asics Negra CoolMax', price:7935, brand:'Asics', color:'Negra', code: '196800', stock: 9},
// {title: 'Remera Adidas Camel CoolMax', price:8715, brand:'Adidas', color:'Camel', code: '125305', stock: 20},
// {title: 'Calza Larga Nike Blanca Algodon', price:9065, brand:'Nike', color:'Blanca', code: '195003', stock: 16},
// {title: 'Short Asics Gris Dry fit', price:7455, brand:'Asics', color:'Gris', code: '126088', stock: 13},
// {title: 'Short Puma Rojo Algodon', price:7045, brand:'Puma', color:'Rojo', code: '177667', stock: 7},
// {title: 'Pantalon Puma Camel Algodon', price:8240, brand:'Puma', color:'Camel', code: '181428', stock: 19},
// {title: 'Remera Asics Camel Dry fit', price:8390, brand:'Asics', color:'Camel', code: '124538', stock: 14},
// {title: 'Short Puma Negra Microfibra', price:8745, brand:'Puma', color:'Negra', code: '168191', stock: 17},
// {title: 'Remera Nike Camel Algodon', price:8145, brand:'Nike', color:'Camel', code: '149210', stock: 2},
// {title: 'Remera Asics Negra Microfibra', price:7845, brand:'Asics', color:'Negra', code: '148057', stock: 3},
// {title: 'Remera Reebok Rojo Algodon', price:9040, brand:'Reebok', color:'Rojo', code: '132519', stock: 1},
// {title: 'Calza Larga Asics Negra Algodon', price:9320, brand:'Asics', color:'Negra', code: '130924', stock: 17},
// {title: 'Pantalon Reebok Blanca Algodon', price:7700, brand:'Reebok', color:'Blanca', code: '146323', stock: 0},
// {title: 'Short Puma Camel Polyester', price:7630, brand:'Puma', color:'Camel', code: '165334', stock: 17},
// {title: 'Short Adidas Blanca Dry fit', price:7835, brand:'Adidas', color:'Blanca', code: '196569', stock: 13},
// {title: 'Remera Puma Negra Polyester', price:7375, brand:'Puma', color:'Negra', code: '160118', stock: 19},
// {title: 'Calza Corta Asics Camel Microfibra', price:8100, brand:'Asics', color:'Camel', code: '110827', stock: 4},
// {title: 'Pantalon Puma Blanca Polyester', price:9920, brand:'Puma', color:'Blanca', code: '109378', stock: 6},
// {title: 'Calza Larga Reebok Camel Dry fit', price:9050, brand:'Reebok', color:'Camel', code: '170271', stock: 0},
// {title: 'Pantalon Reebok Negra Microfibra', price:7060, brand:'Reebok', color:'Negra', code: '104052', stock: 12},
// {title: 'Short Asics Gris Algodon', price:9935, brand:'Asics', color:'Gris', code: '168520', stock: 18},
// {title: 'Short Adidas Blanca Microfibra', price:7015, brand:'Adidas', color:'Blanca', code: '163298', stock: 12},
// {title: 'Pantalon Reebok Rojo CoolMax', price:9940, brand:'Reebok', color:'Rojo', code: '110635', stock: 18},
// {title: 'Pantalon Nike Camel Polyester', price:7840, brand:'Nike', color:'Camel', code: '165207', stock: 11},
// {title: 'Remera Adidas Rojo Microfibra', price:9535, brand:'Adidas', color:'Rojo', code: '184201', stock: 16},
// {title: 'Short Adidas Camel Dry fit', price:8870, brand:'Adidas', color:'Camel', code: '129618', stock: 9},
// {title: 'Calza Corta Reebok Rojo Microfibra', price:9960, brand:'Reebok', color:'Rojo', code: '157776', stock: 5},
// {title: 'Remera Reebok Negra Microfibra', price:9980, brand:'Reebok', color:'Negra', code: '151486', stock: 11},
// {title: 'Pantalon Nike Blanca Microfibra', price:8955, brand:'Nike', color:'Blanca', code: '152262', stock: 19},
// {title: 'Remera Reebok Blanca Microfibra', price:8445, brand:'Reebok', color:'Blanca', code: '129873', stock: 10},
// {title: 'Short Puma Blanca Microfibra', price:7255, brand:'Puma', color:'Blanca', code: '172235', stock: 13},
// {title: 'Remera Adidas Blanca Polyester', price:8335, brand:'Adidas', color:'Blanca', code: '103494', stock: 19},
// {title: 'Short Nike Blanca CoolMax', price:7985, brand:'Nike', color:'Blanca', code: '157225', stock: 11},
// {title: 'Short Reebok Blanca Polyester', price:9660, brand:'Reebok', color:'Blanca', code: '181432', stock: 2},
// {title: 'Remera Asics Blanca CoolMax', price:7620, brand:'Asics', color:'Blanca', code: '161520', stock: 5},
// {title: 'Short Puma Gris Microfibra', price:8280, brand:'Puma', color:'Gris', code: '137308', stock: 7},
// {title: 'Pantalon Adidas Blanca Dry fit', price:7190, brand:'Adidas', color:'Blanca', code: '103441', stock: 20},
// {title: 'Calza Larga Puma Rojo Dry fit', price:9350, brand:'Puma', color:'Rojo', code: '173518', stock: 4},
// {title: 'Calza Corta Puma Rojo Algodon', price:7070, brand:'Puma', color:'Rojo', code: '152540', stock: 17},
// {title: 'Calza Larga Adidas Gris Algodon', price:8005, brand:'Adidas', color:'Gris', code: '120356', stock: 11},
// {title: 'Short Asics Camel Microfibra', price:9700, brand:'Asics', color:'Camel', code: '154008', stock: 7},
// {title: 'Calza Corta Nike Negra Microfibra', price:8260, brand:'Nike', color:'Negra', code: '166439', stock: 13},
// {title: 'Calza Corta Reebok Negra CoolMax', price:7295, brand:'Reebok', color:'Negra', code: '120613', stock: 4},
// {title: 'Calza Corta Puma Camel Dry fit', price:9825, brand:'Puma', color:'Camel', code: '189773', stock: 18},
// {title: 'Pantalon Reebok Gris Polyester', price:9115, brand:'Reebok', color:'Gris', code: '100876', stock: 11},
// {title: 'Short Nike Camel CoolMax', price:8360, brand:'Nike', color:'Camel', code: '133804', stock: 6},
// {title: 'Remera Adidas Gris Polyester', price:7820, brand:'Adidas', color:'Gris', code: '117465', stock: 12},
// {title: 'Calza Corta Adidas Blanca Polyester', price:9645, brand:'Adidas', color:'Blanca', code: '164091', stock: 10},
// {title: 'Remera Nike Rojo Algodon', price:7070, brand:'Nike', color:'Rojo', code: '179790', stock: 13},
// {title: 'Calza Corta Reebok Gris Algodon', price:7760, brand:'Reebok', color:'Gris', code: '172462', stock: 7},
// {title: 'Calza Corta Nike Camel Polyester', price:7300, brand:'Nike', color:'Camel', code: '165306', stock: 9},
// {title: 'Short Nike Rojo CoolMax', price:7175, brand:'Nike', color:'Rojo', code: '104190', stock: 7},
// {title: 'Remera Adidas Gris Dry fit', price:8155, brand:'Adidas', color:'Gris', code: '152951', stock: 3},
// {title: 'Short Nike Rojo Polyester', price:7075, brand:'Nike', color:'Rojo', code: '157859', stock: 11},
// {title: 'Pantalon Puma Negra Algodon', price:7145, brand:'Puma', color:'Negra', code: '159572', stock: 13},
// {title: 'Remera Puma Gris CoolMax', price:9825, brand:'Puma', color:'Gris', code: '148580', stock: 9},
// {title: 'Calza Larga Reebok Rojo CoolMax', price:7375, brand:'Reebok', color:'Rojo', code: '193287', stock: 13},
// {title: 'Calza Larga Asics Rojo Polyester', price:8255, brand:'Asics', color:'Rojo', code: '168307', stock: 10},
// {title: 'Pantalon Adidas Rojo Algodon', price:9140, brand:'Adidas', color:'Rojo', code: '196262', stock: 2},
// {title: 'Short Adidas Negra CoolMax', price:8550, brand:'Adidas', color:'Negra', code: '129719', stock: 3},
// {title: 'Short Puma Negra Polyester', price:9560, brand:'Puma', color:'Negra', code: '130188', stock: 11},
// {title: 'Calza Larga Asics Negra Microfibra', price:9660, brand:'Asics', color:'Negra', code: '142798', stock: 9},
// {title: 'Calza Larga Adidas Camel Dry fit', price:7450, brand:'Adidas', color:'Camel', code: '114456', stock: 5},
// {title: 'Calza Corta Puma Gris Polyester', price:9695, brand:'Puma', color:'Gris', code: '145225', stock: 12},
// {title: 'Calza Corta Nike Blanca Polyester', price:9200, brand:'Nike', color:'Blanca', code: '177416', stock: 3},
// {title: 'Short Asics Negra Polyester', price:7510, brand:'Asics', color:'Negra', code: '138136', stock: 15},
// {title: 'Calza Larga Nike Gris CoolMax', price:9050, brand:'Nike', color:'Gris', code: '190583', stock: 3},
// {title: 'Short Reebok Blanca Dry fit', price:7050, brand:'Reebok', color:'Blanca', code: '128765', stock: 11},
// {title: 'Short Reebok Gris Polyester', price:7185, brand:'Reebok', color:'Gris', code: '118290', stock: 15},
// {title: 'Short Nike Gris CoolMax', price:8085, brand:'Nike', color:'Gris', code: '197297', stock: 19},
// {title: 'Calza Larga Nike Negra CoolMax', price:8375, brand:'Nike', color:'Negra', code: '106522', stock: 4},
// {title: 'Remera Asics Negra Polyester', price:9140, brand:'Asics', color:'Negra', code: '145548', stock: 0},
// {title: 'Remera Puma Camel Dry fit', price:8875, brand:'Puma', color:'Camel', code: '123306', stock: 14},
// {title: 'Short Puma Negra Dry fit', price:7860, brand:'Puma', color:'Negra', code: '153354', stock: 16},
// {title: 'Short Puma Gris CoolMax', price:9440, brand:'Puma', color:'Gris', code: '122385', stock: 1},
// {title: 'Calza Corta Reebok Negra Dry fit', price:9645, brand:'Reebok', color:'Negra', code: '187574', stock: 15},
// {title: 'Remera Asics Gris CoolMax', price:8730, brand:'Asics', color:'Gris', code: '187978', stock: 11},
// {title: 'Remera Adidas Gris Microfibra', price:8255, brand:'Adidas', color:'Gris', code: '110293', stock: 6}
//         ]
    // )  
    console.log(productos)
}

ordenes()