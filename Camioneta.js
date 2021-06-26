var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var general;
(function (general) {
    var Camioneta = /** @class */ (function (_super) {
        __extends(Camioneta, _super);
        function Camioneta(id, marca, modelo, precio, cuatroXCuatro) {
            var _this = _super.call(this, id, marca, modelo, precio) || this;
            _this.cuatroXCuatro = cuatroXCuatro;
            return _this;
        }
        Camioneta.prototype.getcuatroXCuatro = function () {
            return this.cuatroXCuatro;
        };
        Camioneta.prototype.setCuatroXCuatro = function (cuatroXCuatro) {
            this.cuatroXCuatro = cuatroXCuatro;
        };
        return Camioneta;
    }(general.Vehiculo));
    general.Camioneta = Camioneta;
})(general || (general = {}));
