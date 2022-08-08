import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, ManyToOne } from "typeorm"
import { ObjectType, Field } from "type-graphql";
import { User } from "./User";


@ObjectType()
@Entity()
export class Post extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number

    @Field()
    @Column()
    title!: string

    @Field()
    @Column()
    category!: string

    @Field()
    @Column('text')
    description!: string

    @Field()
    @Column()
    price!: number

    @Field()
    @Column()
    rentPrice!: number

    @Field()
    @Column()
    rentType!: string
    
    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(()=>User)
    @ManyToOne(() => User, (user) => user.postsWritten, {cascade:true})
    creator: User
}
