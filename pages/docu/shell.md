---
layout: page-fullwidth
title: "Net.Create Troubleshooting Guide"
subheadline: "Figuring out what can go wrong with Net.Create"
teaser: "Whether you're a beginner or an experienced software engineer, there are always little roadblocks along the way. Here are a few."
permalink: "/documentation/troubleshooting/"
---

* TOC
{:toc}

# Problems with your "shell"

If you are working on a step ***after*** instructions that reference *the shell**--`.zshrc`,`.bashrc`,`.bash_profile`--you may see errors like `nvm not found`.

Those errors aren't a response to the command in the current step, but to environment settings in the previous step that are making it difficult for your computer to find the necessary programs begin referenced in the current step.

There are a few points along the way where these issues crop up.

## Step 4

{% capture my_include %}{% include_relative Step4.md %}
{% endcapture %}
{{ my_include | markdownify }}

## Step 6

{% capture my_include %}{% include_relative Step6.md %}
{% endcapture %}
{{ my_include | markdownify }}

## Step 8

{% capture my_include %}{% include_relative Step8.md %}
{% endcapture %}
{{ my_include | markdownify }}
