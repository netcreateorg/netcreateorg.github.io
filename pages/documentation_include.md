---
layout: page-fullwidth
title: "Net.Create Documentation"
subheadline: "Getting Started with Net.Create"
teaser: "This documentation is a work in progress."
permalink: "/documentation/index_include"
---

If you prefer to follow installation instructions in video form, we have video-based versions of the Net.Create installation process (current as of 1 Feb 2022) in a [Net.Create playlist at YouTube](https://www.youtube.com/playlist?list=PLM39ibhMucXVuhFHzm56OQHQve-35bFTt) . *You can use the text instructions here to copy and paste the installation instructions as you follow along with the video.*


* TOC
{:toc}

# Getting Started (for folks new to technology)

The first part of this guide will help you install Net.Create and keep it up to date. The second part of the guide documents the files, file formats, and file locations you’ll need to know to run Net.Create on a regular basis.

## The “Command line” or “Command prompt”

Text before the vi include

{% include_relative "./docs/bashprofilevi.md" %}

Text after the vi include but before the capture include

{% capture my_include %}{% include "./docs/bashprofilevi.md" %}{% endcapture %}
{{ my_include | markdownify }}

After the markdownify