---
title: Symfony & EasyAdmin – space for extra functionalities
slug: symfony-easyadmin-space-for-extra-functionalities
date: 2022-04-07
tags: [Symfony, EasyAdmin, custom-easy-admin]
img_hero: ./hero.jpg
img_hero_alt: crop fields in the spring
img_hero_credit: Yannick (Rêveries)
summary: In Symfony, the recommended admin backend is EasyAdmin. To illustrate the base capabilities of the tool, an EasyAdmin demo repository has been setup for anyone to look at and experience how to use EasyAdmin. The objective in this series of articles (supported by a live repository) is to illustrate less common, but still useful, features of EasyAdmin.
---

### Introduction

In [Symfony](https://www.symfony.com/), the recommended admin backend is [EasyAdmin](https://symfony.com/bundles/EasyAdminBundle/current/index.html). This simple tool is easily deployed, since V3, easily configurable to allow a large array of possibilities/functionalities.

To illustrate the base capabilities of the tool, an [EasyAdmin demo repository](https://github.com/EasyCorp/easyadmin-demo) has been setup for anyone to look at and experience how to use [EasyAdmin](https://symfony.com/bundles/EasyAdminBundle/current/index.html).

This repository is based on the [Symfony demo repository](https://github.com/symfony/demo) which illustrates a lot of Symfony concepts into one simple blog application.

![What's the target here?](./hoop.jpg)

<p style="text-align: center; margin-top: -25px; color: #777">What's the target here?</p>

In discussions, help given or in my current works, I found myself needing to go beyond the simple cases described in the [EasyAdmin demo repository](https://github.com/EasyCorp/easyadmin-demo). Some more specific cases, that are described fully or not fully in the documentation but needed a specific implementation.

The idea emerged in my little head to then build a small application showcasing those more specific cases based on potential real use cases… the [Symfony EasyAdmin custom repository](https://github.com/yalit/custom-easy-admin) was born 😀 !

### Application objective

When forked, the application was a simple blog application, only admins and regular users, a simple admin with Posts and Comments, it needed a bit of an upgrade to introduce needs for more complex cases.

To allow that, I'm targeting the following updates to the application:

1. Introducing more User Roles as the following:

   - Authors
   - Publishers
   - Reviewers
   - Existing roles: Admins and Users

2. Introducing statuses and Workflows for Posts and Comments:

   - Posts:
     - have the following statuses : Draft / In Review / Published / Cancelled
     - and the following transitions : Draft -> In Review / In Review to Published or to Cancelled
   - Comments:
     - have the following statuses : Created / Published / Cancelled
     - and the following transitions : Created to Published or to Cancelled

3. Introducing the following use-cases
   - Admin can do anything in the system
   - Users:
     - Only Admin can update (any CRUD operation) Users
   - Posts:
     - Only Authors can create and update their own Posts
     - Only Authors can push their Posts to In Review
     - Only Publishers can Publish or Cancel a Post
     - Only Authors or Publishers can see Posts in EasyAdmin
   - Comments:
     - Any logged in user can create a Comment
     - Only Reviewers can Publish or Cancel a Comment

Those additions allow already for a certain amount of customization in the easyadmin backend and I’ll introduce more use cases as we go along.

### The Repository

The [repository of the customization](https://github.com/yalit/custom-easy-admin) will keep in the main branch all the updates made on the easyadmin. I’ll keep one branch for each different buld of updates made along the way so that if you want to look at a particular change, you’ll be able to as well (as me in the future ;-)).

To enable those updates, changes will be made also to the Symfony backend to support the EasyAdmin use cases, however, the application itself will not be updated as I want to focus on the EasyAdmin part.

Of course, maximum functional testing of the updated EasyAdmin part will be done.

## The blog series

The goal is also for me to document the changes made in the repository while linking them to the [documentation of EasyAdmin](https://symfony.com/doc/current/EasyAdminBundle/index.html) to enable anyone to make the connection between what I’m doing and what is existing in EasyAdmin…

Below you’ll see the list of the different posts linked to one specific update in the custom EasyAdmin (each post should correspond to one specific branch in the repository):

1. Only Admin can update (any CRUD operation) Users
2. Post Index page : new post actions usable in 3 parts:
   1. Fields customization
   2. Access restriction
   3. Custom entity actions

> All pictures of this article are of the making of the author and some can be seen here : [Rêveries](/reveries)
