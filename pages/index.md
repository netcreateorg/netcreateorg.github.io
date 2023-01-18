---
#
# Use the widgets beneath and the content will be
# inserted automagically in the webpage. To make
# this work, you have to use › layout: frontpage
#
layout: frontpage
introtext: "Net.Create is an open-source analysis tool that offers simultaneous multi-user network-data entry that accommodates duplicate and ambiguous network data, provides live visualizations of up-to-the-minute entries from other team members, and is structured around clear citational and interpretive practices."
widget1:
  title: "Humanities-driven network analysis for research and teaching"
  url: '/why/'
  image: widget-1-302x182.jpg
  text: "Humanities approaches ask practitioners to assess significance and interpret interactions using primary sources . Without a good framework to support teams of researchers working with a variety of documents, the network analysis can end up taking first billing. Net.Create helps humanities practitioners--researchers, students and teachers alike--build an interpretive framework into which humanities close-reading details fit using network analysis approaches and build network-analysis proficiency through humanities close-reading activities."
  more: "ignore"
widget2:
  title: "Data literacy through social network exploration"
  url: '/why/'
  image: widget-github-303x182.jpg
  text: 'Social media data is, at its core, network data. Net.Create offers teams of researchers, or students working together in classrooms, a that allow (but warn about) duplicate data, provide live visualizations of up-to-the-minute entries from other team members and are structured around clear citational practices.'
  more: "ignore"
widget3:
  title: "Free, easy-to-use network data entry and analysis"
  url: '/activities/'
  image: widget-activities-303x182.jpg
  text: "Net.Create's open-source software package  is available on Github as a downloadable package. It can be installed for use as a web app, running either  locally on MacOS, or as a droplet on Digital Ocean for $6-10/month. Our  documentation offers installation processes for both, and we have activities and publications that provide examples for research teams and classrooms of several shapes and sizes."
  more: "Documentation and Download"
  
# Use the call for action to show a button on the frontpage
#
# To make internal links, just use a permalink like this
# url: /getting-started/
#
# To style the button in different colors, use no value
# to use the main color or success, alert or secondary.
# To change colors see sass/_01_settings_colors.scss
#

callforaction:
  url: /contact/
  text: Contact the Net.Create Team ›
  style: alert
permalink: /index.html

# This is a nasty hack to make the navigation highlight
# this page as active in the topbar navigation
#
homepage: true
---
