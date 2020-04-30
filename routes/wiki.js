const express = require('express')
const router = (express).Router()
const { Page } = require('../models/index')
const addPage = require('../views/addPage')
const wikiLayout = require('../views/wikipage')
const main = require('../views/main')



router.get('/', async (req, res, next) => {
    let pageList = await Page.findAll()
    res.send(main(pageList))
})



router.post('/', async (req, res, next) => {
    let newPost = req.body

    const page = new Page({
        title: newPost.title,
        content: newPost.content,
        status: newPost.status
    })
    try {
        let savedPage = await page.save();
        res.redirect(`/wiki/${savedPage.slug}`);
    } catch (error) { next(error) }
})

router.get('/add', (req, res, next) => {
    res.send(addPage());
})

router.get('/:slug', async (req, res, next) => {
    let newPage = await Page.findOne({
        where: {slug: `${req.params.slug}`}
    })
    res.send(wikiLayout(newPage))
  });

module.exports = router