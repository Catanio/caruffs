const expect = require('chai').expect;
const Profile = require('../src/models/Profile');
const profileMocked = require('./mocks/profile_mock');

describe('ProfileSchema', () => {
  let profile = {};

  beforeEach((done) => {
    profile = profileMocked.mock();
    done();
  });

  it('should be valid from mock', (done) => {
    const p = new Profile(profile);
      
    p.validate((err) => {
      expect(err).to.be.a('null');
      done();
    });
  });

  it('should hash password', done => {
    const p = new Profile(profile);

    expect(p.password).to.not.equal(profile.password);
    done();
  });

  it('confirmed_email shoul have default false', done => {
    const p = new Profile(profile);

    expect(p.confirmed_email).to.equal(false);
    done();
  });

  describe('should be invalid if', () => {
    it('mail is not an email', (done) => {
      profile.mail = "other";
      const p = new Profile(profile);
      
      p.validate((err) => {
        expect(err.errors.mail).to.exist;
        done();
      });
    });

    it('mail is empty', (done) => {
      profile.mail = null;
      const p = new Profile(profile);
      
      p.validate((err) => {
        expect(err.errors.mail).to.exist;
        done();
      });
    });

    it('idUffs is empty', (done) => {
      profile.idUffs = null;
      const p = new Profile(profile);
      
      p.validate((err) => {
        expect(err.errors.idUffs).to.exist;
        done();
      });
    });
  });
});