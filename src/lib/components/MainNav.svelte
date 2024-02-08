<script>
	import { navItems } from '$lib/config';
	import { isMenuOpen } from '../assets/js/store';
	import NavItem from './NavItem.svelte';
	import HamburgerMenuButton from './HamburgerMenuButton.svelte';
	export let urlStr;
    const imagePath = 'logo.svg';
</script>

<!-- Contents of this file will be used in the header and the responsive hamburger menu. -->
<!-- <nav class="main-nav" class:open={$isMenuOpen}>
	<ul>
		{#each navItems as page}
			<NavItem href={page.route}>
				{page.title}
			</NavItem>
		{/each}
	</ul>
	<HamburgerMenuButton closeOnly="true" />
</nav> -->
<div class="container-fluid header-section" class:open={$isMenuOpen}>
    <div class="col-3" style="display: flex;
    vertical-align: middle;
    padding-left: 50px;
}">
       <a style="display: flex;" href="/"><img style="width: 160px;" src="/logo.svg" alt="My Image" /></a>

        <!-- <img src={`public/${imagePath}`} alt="My Image" /> -->
    </div>
    <div class="col-5">
        <nav id="main-nav" class="navbar navbar-expand-lg navbar-light" style="margin-top: 23px; font-family:'DM sans'">

            <!-- Main Menu -->
          <ul class="triplea_main_nav_ul">
            <!-- Static Main Menu Items -->
            <li class:class="{{ 'nav-item': true, 'menu-item-active': urlStr === '/' }}">
              <a class="nav-link" href="/">Our Solutions</a>
            </li>
            <li class:class="{{ 'nav-item': true, 'menu-item-active': urlStr === '/products' }}">
              <a class="nav-link" href="/blog">Blog</a>
            </li>
            <li class:class="{{ 'nav-item': true, 'menu-item-active': urlStr === '/blog' }}">
              <a class="nav-link" href="/blog">Resources</a>
            </li>
            <li class:class="{{ 'nav-item': true, 'menu-item-active': urlStr === '/contact' }}">
              <a class="nav-link" href="/contact">Contact Us</a>
            </li>
          </ul>

      </nav>
    </div>
    <div class="col-4">
        <div class="row" style="margin-top: 5px;">
            <div class="col-4" style="padding-left: 20px;">
                <button class=" primary-btn">Log In</button>
            </div>
            <div class="col-4">
                <button class=" secondary-btn">Sign Up</button>
            </div>
        </div>
    </div>
</div>

  <style>
    body{
        background-color: #161141;
    }
    .header-section{
        min-height: 90px;
        display: flex;
        justify-content: space-evenly;
        flex-direction: row;
    }

    .container, .container-fluid {
      background-color: #161141;
      color: #FFF;
    }
	a {
		color: #FFF;
	}
    .triplea_main_nav_ul{
        display: flex;
        justify-content: space-evenly;
        list-style: none;
        width: 100%;
    }

  </style>
