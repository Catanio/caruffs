const mongoose = require('mongoose');
const expect = require('chai').expect;
 
const PointSchema = require('../src/schemas/PointSchema');
const Point = mongoose.model('Point', PointSchema);

describe('PointSchema', () => {
  describe('should be invalid if', () => {
    it('type is empty', (done) => {
      const p = new Point();
      
      p.validate((err) => {
        expect(err.errors.type).to.exist;
        done();
      });
    });

    it('coordinates is empty', (done) => {
      const p = new Point();
      p.type = 'point';
      
      p.validate((err) => {
        expect(err.errors.type).to.exist;
        done();
      });
    });
  });
});