const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index.js');

chai.use(chaiHttp);

describe('Episodes endpoint', () => {
  const episodesEndpoint = '/api/episodes';

  describe('GET all episodes endpoint', () => {
    it('Should respond with a status of 200 and return a well formed json', done => {
      chai
        .request(app)
        .get(episodesEndpoint)
        .end((err, res) => {
          chai.expect(res.statusCode).to.equal(200);
          chai.expect(res.body).to.be.a('array');
          chai
            .expect(res.body[0])
            .to.have.property('name', 'Minimum Viable Product');
          done();
        });
    });
  });

  describe('GET filtered episodes endpoint', () => {
    it('Should accept season as query parameter and return filtered episodes', done => {
      const seasonNumber = 1;

      chai
        .request(app)
        .get(episodesEndpoint)
        .query({ season: seasonNumber })
        .end((err, res) => {
          chai.expect(res.statusCode).to.equal(200);
          chai.expect(res.body.every(ep => ep.season == seasonNumber)).to.be
            .true;
          done();
        });
    });

    it('Should only accept numeric season query parameter of maximum 2 digits, and return status code of 422 for anything else', done => {
      const stringSeasonNumber = 'asdqwe';

      chai
        .request(app)
        .get(episodesEndpoint)
        .query({ season: stringSeasonNumber })
        .end((err, res) => {
          chai.expect(res.statusCode).to.equal(422);
          done();
        });
    });
  });
});
