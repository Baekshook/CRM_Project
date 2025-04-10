"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const customer_entity_1 = require("./entities/customer.entity");
let CustomersService = class CustomersService {
    constructor(customersRepository) {
        this.customersRepository = customersRepository;
    }
    async create(createCustomerDto) {
        const existingCustomer = await this.customersRepository.findOne({
            where: { email: createCustomerDto.email },
        });
        if (existingCustomer) {
            throw new common_1.ConflictException(`이메일 ${createCustomerDto.email}는 이미 등록되어 있습니다.`);
        }
        const customer = this.customersRepository.create(createCustomerDto);
        return this.customersRepository.save(customer);
    }
    async findAll() {
        return this.customersRepository.find();
    }
    async findOne(id) {
        const customer = await this.customersRepository.findOne({ where: { id } });
        if (!customer) {
            throw new common_1.NotFoundException(`Customer with ID "${id}" not found`);
        }
        return customer;
    }
    async update(id, updateCustomerDto) {
        if (updateCustomerDto.email) {
            const existingCustomer = await this.customersRepository.findOne({
                where: { email: updateCustomerDto.email },
            });
            if (existingCustomer && existingCustomer.id !== id) {
                throw new common_1.ConflictException(`이메일 ${updateCustomerDto.email}는 이미 다른 고객이 사용 중입니다.`);
            }
        }
        const customer = await this.findOne(id);
        Object.assign(customer, updateCustomerDto);
        return this.customersRepository.save(customer);
    }
    async remove(id) {
        const result = await this.customersRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Customer with ID "${id}" not found`);
        }
    }
};
exports.CustomersService = CustomersService;
exports.CustomersService = CustomersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(customer_entity_1.Customer)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CustomersService);
//# sourceMappingURL=customers.service.js.map