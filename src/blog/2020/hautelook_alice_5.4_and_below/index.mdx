---
title: Symfony – Hautelook/Alice – hash passwords at fixtures load (up to 5.4)
slug: symfony-hautelook-alice-hash-passwords-at-fixtures-load
date: 2020-11-08
tags: [Symfony, extension, Fixtures, Hashing, Security]
img_hero: ./hero.jpeg
img_hero_alt: People waking on the beach in the sunset
img_hero_credit: Yannick (Rêveries)
summary: In my Symfony 4/5 projects, to enable some data in my tables for raw development and for the testing, I use Hautelook/Alice Bundle
---

### Introduction

In my Symfony 4/5 projects, to enable some data in my tables for raw development and for the testing, I use Hautelook/Alice Bundle. It is a great tool to load fixtures in the database. It is very easy to use and very powerful. It is a must-have for me in my projects.

### Disclaimer

**Attention**, the article below is valid only for Symfony up to 5.4 as some elements are deprecated in Symfony 6.0 (the UserPasswordEncodeInterface is deprecated as the Hashing functionalities have been extracted into a new Component in Symfony 5.3 : https://symfony.com/blog/new-in-symfony-5-3-passwordhasher-component).

To find the details for the Symfony 5.3 and upwards, please look here : https://yalit.be/blog/2021/08/17/symfony-hautelook-alice-hash-passwords-at-fixtures-load-5-3-and-upwards/

### Problem

One of the elements that I want to be able to fake are **users**. Unfortunately, I didn’t find any direct way using the bundle pre-existing features to load hashed passwords. Meaning, there is no faker function to hash any string based on the defined Symfony User Password hashing (cfr. [Symfony Security Definition](https://symfony.com/doc/current/security.html#c-encoding-passwords))

So, I could to the following:

1. I could use plain passwords. I’m only in dev and test, but the issue is that during the testing, I’ll try to connect and I’ll fall against the Security wall where Symfony will try to hash my input password against the stored password and so will fail
2. could define it by hand in the fixtures.yaml file of Hautelook/Alice. It could work regarding the above issue, but I would have to look at it by hand (there is console command to do that…) and I do want to find a structural way to do it
3. I could use the [Custom Faker Providers](https://github.com/hautelook/AliceBundle/blob/master/doc/faker-providers.md) functionality of Alice bundle. That’s what I’m describing below

I'll dive into the option 3 below as It’s quite easy actually, you only need to follow the following [Custom Faker Provider](https://github.com/hautelook/AliceBundle/blob/master/doc/faker-providers.mdhttps://github.com/hautelook/AliceBundle/blob/master/doc/faker-providers.md) page.

### Implementation

#### 1. Create a new Provider

So le'ts create a HashPasswordProvider.php file in the src/DataFixtures/Provider folder of your project.

```php
<?php

namespace App\DataFixtures\Providers;

use App\Entity\User;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class HashPasswordProvider
{
    /**
     * @var UserPasswordEncoderInterface
     */
    private $encoder;
    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    public function hashPassword(string $plainPassword): string
    {
        return $this->encoder->encodePassword(new User(), $plainPassword);
    }

}
```

Let’s break down the different elements:

- to be able to hash a password, you need to know which hashing algorithm is defined for the application. Fortunately, the following interface : UserPasswordEncoderInterface will provide you the access to that knowledge

So, let’s inject it into our Class to benefit from it

```php
<?php
    /**
     * @var UserPasswordEncoderInterface
     */
    private $encoder;
    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }
}
```

2.  then, simply define a public function that will take the necessary input (here a plain password) and returns the hashed password using the UserPasswordEncoder injected service

```php
<?php
    public function hashPassword(string $plainPassword): string
    {
        return $this->encoder->encodePassword(new User(), $plainPassword);
    }
}

```

#### 2. Register the Provider as a Service

After that, you need to define your new Custom Provider as a service tagging him for the Hautelook/Alice bundle to recognize it as a Custom data Provider

```yaml
# config/services.yaml

services:
  App\DataFixtures\Providers\HashPasswordProvider:
    tags: [{ name: nelmio_alice.faker.provider }]
```

#### 3. Use the Custom Provider in the fixtures.yaml file

Eventually, you can use it in your fixtures.yaml file

```yaml
//fixtures\User.yaml
App\Entity\User:
    user_{1..10}:
        email: <email()>
        password: <hashPassword('plainPassword')>
```

It's as simple as that.
