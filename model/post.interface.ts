import { Component } from "react"

export interface PostInformationInterface {
    title: string
    date: string
    year: string
    slug: string
    summary: string
    tags: string[]
}

export interface PostInterface extends PostInformationInterface {
    img_hero: string
    img_hero_alt: string
    img_hero_credit: string
    content: string
}
