import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { News, NewsService, NewsForUpdate } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService){}

  @Get('/:id')
  get(@Param('id') id: string): News{
    return this.newsService.find(parseInt(id))
  }

  @Get('/all')
  getAll(){
    return this.newsService.findAll()
  }

  @Post()
  create(@Body() news: News): News{
    return this.newsService.create(news)
  }

  @Post('/:id')
  update(@Body() news: NewsForUpdate, @Param('id') id: string){
    return this.newsService.update(news, id)
  }

  @Delete('/:id')
  remove(@Param('id') id: string){
    let res = this.newsService.remove(parseInt(id))
    return res ? 'Удалено успешно' : 'Запись не найдена'
  }
}
