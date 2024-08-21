import { Component } from "react"

export interface PostInformationInterface {
    title: string
    date: string
    year: string
    slug: string
    summary: string
}

export interface PostInterface extends PostInformationInterface {
    tags: string[]
    img_hero: string
    img_hero_alt: string
    img_hero_credit: string
    content: string
}
