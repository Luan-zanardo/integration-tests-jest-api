import pactum from 'pactum';
import { StatusCodes } from 'http-status-codes';
import { SimpleReporter } from '../simple-reporter';

describe('DummyJSON API', () => {
  const p = pactum;
  const rep = SimpleReporter;
  const baseUrl = 'https://dummyjson.com';

  beforeAll(() => p.reporter.add(rep));
  afterAll(() => p.reporter.end());

  describe('Products', () => {
    it('GET - Buscar produto', async () => {
      await p
        .spec()
        .get(`${baseUrl}/products/1`)
        .expectStatus(StatusCodes.OK)
        .expectJsonLike({
          id: 1,
          title: 'Essence Mascara Lash Princess',
        });
    });

    it('GET - Listar produtos', async () => {
      await p
        .spec()
        .get(`${baseUrl}/products`)
        .expectStatus(StatusCodes.OK)
        .expectJsonLike({
          products: [
            {
              id: 1,
            },
          ],
        });
    });

    it('POST - Criar produto', async () => {
      await p
        .spec()
        .post(`${baseUrl}/products/add`)
        .withJson({
          title: 'Produto Teste Luan',
          price: 100,
          description: 'Produto criado para teste automatizado',
        })
        .expectStatus(StatusCodes.CREATED)
        .expectJsonLike({
          title: 'Produto Teste Luan',
          price: 100,
          description: 'Produto criado para teste automatizado',
        });
    });

    it('PUT - Atualizar produto', async () => {
      await p
        .spec()
        .put(`${baseUrl}/products/1`)
        .withJson({
          title: 'Produto Atualizado',
        })
        .expectStatus(StatusCodes.OK)
        .expectJsonLike({
          id: 1,
          title: 'Produto Atualizado',
        });
    });

    it('DELETE - Excluir produto', async () => {
      await p
        .spec()
        .delete(`${baseUrl}/products/1`)
        .expectStatus(StatusCodes.OK)
        .expectJsonLike({
          id: 1,
          isDeleted: true,
        });
    });
  });
});