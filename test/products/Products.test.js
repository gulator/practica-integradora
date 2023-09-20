import chai from 'chai';
import supertest from 'supertest';

const expect = chai.expect;
const request = supertest('http://localhost:8080');

describe('Test de integracion - Productos', () => {
  it('endpoint POST /api/testproducts debe poder crear un producto', async ()=>{
    const producto = {
      title: 'REMERA NIKE BLANCA ALGODON',
      brand: 'Nike',
      price: 9555,
      color: 'Blanca',
      code: '123999',
      stock: 20
    }

    const { status, _body } = await request.post('/api/testproducts').send(producto)
    
    expect(_body).to.have.property('_id');
    expect(status).to.equal(201)
    // Valido que el campo onwer sea por defecto "admin"
    expect(_body.owner).to.equal('admin')
  });

  it('endpoint GET /api/testproducts debe poder obtener todos los productos', async ()=>{
    const { status, _body } = await request.get('/api/testproducts')

    expect(status).to.equal(200)
    expect(_body.payload).to.be.an('array')
  });

  it("endpoint GET /api/testproducts/:pid debe retornar un error si el ID de producto es inválido", async () => {
    const pid = 'ksudjfhlaskjfa'

    const { status, _body } = await request.get(`/api/testproducts/${pid}`)
    
    expect(status).to.equal(400);
    expect(_body.error).to.equal("Invalid ID");
  });
  it("endpoint GET /api/testproducts/:pid debe devolver el producto solicitado por parámetro", async () => {
    const pid = '64f10de647f72bd864148d10'

    const { statusCode, _body } = await request.get(`/api/testproducts/${pid}`)

    expect(statusCode).to.equal(200);
    expect(_body[0]._id).to.equal(pid);
  });
});