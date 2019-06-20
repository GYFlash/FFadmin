// FileName: Navigation.ts
// ProjectName: express-admin
// 作者：区区电脑
// createTime: 2019/4/28

import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Navigation extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column({
        type: 'text',
        charset: 'utf8'
    })
    title: string | undefined;

    @Column({
        type: 'text',
        charset: 'utf8'
    })
    subNavItems: string | undefined;

    @Column({
        type: 'text',
        charset: 'utf8'
    })
    iconClass: string | undefined;
}
