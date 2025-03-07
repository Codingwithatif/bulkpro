/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Controller, Get, Post, Body, Param } from '@nestjs/common';

@Controller('companies') // ✅ Defines the '/companies' route
export class CompanyController {
  
  @Get()
  getAllCompanies() {
    return [{ id: 1, name: 'Example Company' }]; // Sample response
  }

  @Get(':companyId')
  getCompanyById(@Param('companyId') companyId: number) {
    return { companyId, name: `Company ${companyId}` };
  }

  @Post()
  createCompany(@Body() companyData: any) {
    return { message: 'Company created successfully', company: companyData };
  }
}
