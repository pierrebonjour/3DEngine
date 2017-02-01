var calculetteMixin = Base => class extends Base {
  calc() { }
};

var aleatoireMixin = Base2 => class extends Base2 {
  randomiseur() { }
};


class Toto { }
class Truc extends calculetteMixin(aleatoireMixin(Toto)) { }