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
    img_header: string
    img_header_alt: string
    img_header_credit: string
    content: string
}
