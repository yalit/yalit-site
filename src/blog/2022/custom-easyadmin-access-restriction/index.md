---
title: Custom EasyAdmin – Thou shall rule the Posts Listing (2) – Access restriction
slug: custom-easyadmin-thou-shall-rule-the-posts-listing-2-access-restriction
date: 2022-06-07
tags: [Symfony, EasyAdmin, custom-easy-admin, voters, roles, access]
img_hero: ./hero.jpg
img_hero_alt: tree with autumn colors
img_hero_credit: Yannick (Rêveries)
summary: Let’s continue our dive into the customization of Easy Admin listing page. We’ve first looked at the fields customization. Here, we want to continue exploring the listing and its specificities. In this second, out of three posts here, we’ll concentrate ourselves on how to define data access restrictions.
---

> This article is part of a series of Article around the customization of EasyAdmin within Symfony. You can find the list of [related articles](/blog/tags/custom-easy-admin) and the context of it in this article : [Symfony & EasyAdmin – space for extra functionalities](/blog/symfony-easyadmin-space-for-extra-functionalities)

## Introduction

Let’s continue our dive into the customization of Easy Admin listing page. We’ve first looked at the [fields customization](/blog/custom-easyadmin-thou-shall-rule-the-posts-listing-1-fields-customization). Here, we want to continue exploring the listing and its specificities.

In this second, out of three posts here, we’ll concentrate ourselves on how to define data access restrictions.

## Impacted functionalities

To allow the customization of the data access into our listing, we’ll need to look at the following functionalities of [EasyAdmin](https://symfony.com/bundles/EasyAdminBundle/current/index.html) :

- Access restriction at the entity level

![Two doors next to each other](./doors.jpg)

## Entity restriction

Still working on the Post entity (see previous posts), we want only specific roles to be able to see the Posts : the Authors and the Publishers.

The idea is to disallow access to the whole data on the Posts for the non-author and non-publishers to the view of the data in the listing and in the details.

To do that, we’ll use the [Crud entity level access restriction](https://symfony.com/bundles/EasyAdminBundle/current/security.html#restrict-access-to-fields) with a custom Voter to allow fine definition of the access rights.

The updates in the PostCrudController :

```php
//App/Controller/EasyAdmin/PostCrudController.php

public function configureCrud(Crud $crud): Crud
{
    return $crud
        ->setDefaultSort(['publishedAt' => 'DESC'])
        // set for the entire entity (for any instance) the needed permission by using a Custom Voter
        ->setEntityPermission(PostVoter::SHOW)
        ;
}
```

So, here we do the possibility of EasyAdmin to define permissions at the entity level by using the ->setEntityPermission() which can be used with:

- a Role
- a custom Voter

leveraging here the core security functionalities of Symfony.

The details of the PostVoter:

```php
//App/Security/EasyAdmin/PostVoter.php

class PostVoter extends Voter
{
    public const CREATE = 'easyadmin_create';
    public const SHOW = 'easyadmin_show';
    public const PUBLISH = 'easyadmin_publish';
    public const CANCEL = 'easyadmin_cancel';

    public function __construct(private Security $security)
    {
    }

    protected function supports(string $attribute, mixed $subject): bool
    {
        return (($subject instanceof Post
            && \in_array($attribute, [self::SHOW, self::PUBLISH, self::CANCEL], true))
            || \in_array($attribute, [self::CREATE], true)
        );
    }
    protected function voteOnAttribute(string $attribute, mixed $subject, TokenInterface $token): bool
    {
        $user = $token->getUser();

        // the user must be logged in; if not, deny permission
        if (!$user instanceof User) {
            return false;
        }

        return match ($attribute) {
            self::SHOW => $this->voteOnShow(),
            self::PUBLISH => $this->voteOnPublish(),
            self::CREATE => $this->voteOnCreate(),
            self::CANCEL => $this->voteOnCancel(),
            default => false,
        };
    }

    protected function voteOnShow(): bool
    {
        if ($this->security->isGranted(UserRoles::ROLE_AUTHOR) || $this->security->isGranted(UserRoles::ROLE_PUBLISHER)) {
            return true;
        }

        return false;
    }

    ...
}
```

Here, nothing fancy, as per the [Voter functionality](https://symfony.com/doc/current/security/voters.html), we build here a PostVoter that will determine access to the Posts for specific attributes

> [REPOSITORY](https://github.com/yalit/custom-easy-admin) : the code of this example is available in the branch [02.Post_Workflow_Listing](https://github.com/yalit/custom-easy-admin/tree/02.Post_Workflow_Listing)

> All pictures of this article are of the making of the author and some can be seen here : [Rêveries](/reveries)
