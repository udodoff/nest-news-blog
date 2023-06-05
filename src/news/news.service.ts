import { Injectable } from '@nestjs/common';

function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

export interface News{
    id?: number,
    title: string,
    description: string,
    author: string,
    countViews: number
}
export interface NewsForUpdate{
    title?: string,
    description?: string,
}

@Injectable()
export class NewsService {
    private readonly news: News[] = [{
        id: 1,
        title: 'First News',
        description: 'Hello i\'m Ruslan',
        author: 'Ruslan Udodov',
        countViews: 20
    }]

    create(news: News) : News{
        const finalNews = {...news, id: getRandomInt(0, 999999)}
        this.news.push(finalNews)
        return finalNews
    }

    find(id: News['id']): News | undefined{
        let res = this.news.find(el => el.id === id)
        return res
    }

    findAll(): News[]{
        return this.news
    }

    remove(id: number): Boolean{
        let findid = this.news.findIndex(el => el.id === id)
        if(findid === -1){
            return false
        }
        this.news.splice(findid, 1)
        return true
    }

    update(news: NewsForUpdate, id: string): string{
        let findid = this.news.findIndex(el => el.id === parseInt(id))
        if(findid === -1){
            return 'Ошибка: Запись не найдена'
        }
        this.news[findid] = {
            ...this.news[findid],
            ...news
        }
        return 'Успешно обновлено'
    }
}
