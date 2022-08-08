import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, OneToMany } from "typeorm"
import { ObjectType, Field } from "type-graphql";
import { Post } from "./Post";

@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number

    @Field()
    @Column()
    firstName!: string

    @Field()
    @Column()
    lastName: string

    @Field()
    @Column({ unique: true })
    username!: string

    @Field()
    @Column()
    password!: string
    
    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(()=>[Post])
    @OneToMany(() => Post, (post: any) => post.creator)
    postsWritten: Post[]
}
