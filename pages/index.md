---
#
# Use the widgets beneath and the content will be
# inserted automagically in the webpage. To make
# this work, you have to use › layout: frontpage
#
layout: frontpage
widget1:
  title: "Why networks in humanities learning?"
  url: '/why/'
  image: widget-1-302x182.jpg
  text: "Humanities approaches require students to assess significance and interpret behavior. Without a good framework, it's hard to know which details to marshal in service of these questions. Net.Create helps humanities students build an interpretive framework into which these details fit using network analysis approaches; at the same time, they can build network-analysis proficiency through humanities activities."
widget2:
  title: "Why simultaneous network data entry?"
  url: '/why/'
  image: widget-github-303x182.jpg
  text: 'Network data embedded in open prose needs to be treated differently than network data scraped from large structured datasets. Teams of researchers, or students working together in classrooms, benefit from controls that allow (but warn about) duplicate data, provide live visualizations of up-to-the-minute entries from other team members and are structured around clear citational practices.'
widget3:
  title: "Can I use Net.Create in my classroom/research?"
  url: '/activities/'
  image: widget-activities-303x182.jpg
  text: "In addition to a downloadable package to run Net.Create on a local MacOS as a web site, we have basic activity guides for history and digital-humanities classrooms of several shapes and sizes. Each activity comes with glossaries, slide decks and learning-outcome goals."
  
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
