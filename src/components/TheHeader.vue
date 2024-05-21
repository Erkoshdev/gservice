<template>
  <div class="header">
    <div class="container">
      <div class="header-row">
        <button class="btn btn-plain toggle-menu" :class="{active: isMenu}" @click="toggleMenu">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <a class="logo" @click="goToMain">
          <img src="@/assets/img/logo/logo.png" alt="Логотип">
        </a>
        <div class="search-form">
          <input
              type="text"
              :placeholder="$t('search')"
              v-model="search"
              @keyup="handleSearch"
          >
        </div>
        <ul class="header-tools">
          <li>
            <a
                class="header-tools-btn favourite-btn"
                :class="{active: isAside === 'favourite'}"
                @click.stop="toggleAside('favourite')"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.472 6.35156L11.9942 6.85764L12.5162 6.35137L12.6283 6.24259C13.6335 5.30315 14.7642 4.81257 16.0167 4.75562L16.2735 4.75001C19.0158 4.75428 21.25 6.98001 21.25 9.71723C21.25 11.0822 21.0183 12.0296 20.2988 13.067C19.5425 14.1577 18.2309 15.3726 15.9595 17.1919C15.959 17.1923 15.9585 17.1927 15.958 17.193L15.0303 17.9284L12.6685 19.7692C12.2755 20.0755 11.7245 20.0755 11.3315 19.7692L8.6474 17.6746C8.64681 17.6741 8.64621 17.6736 8.64562 17.6731C6.11076 15.6702 4.64578 14.3643 3.80125 13.2078C3.0001 12.1107 2.75 11.1371 2.75 9.71723C2.75 6.97738 4.98847 4.75 7.73438 4.75C9.06566 4.75 10.2738 5.2405 11.3567 6.23981L11.472 6.35156Z" stroke="#0A0A0A" stroke-width="1.5"/>
              </svg>
              <span>{{ $t('favourite') }}</span>
            </a>
          </li>
          <li>
            <a
                class="header-tools-btn notification-btn"
                :class="{active: isAside === 'notification'}"
                @click.stop="toggleAside('notification')"
            >
              <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.5041 2.09998C16.5194 2.09998 19.4 5.37829 19.4 9.63156V11.2312C19.4 11.4599 19.5932 11.763 20.1205 12.307C20.1881 12.3768 20.2518 12.4415 20.3909 12.5823C21.4721 13.6789 21.9 14.3107 21.9 15.3272C21.9 15.7717 21.8481 16.1182 21.6323 16.5334C21.1761 17.411 20.2089 17.9 18.7631 17.9L16.8514 17.901C16.2221 20.2335 14.7209 21.5002 12.5 21.5002C10.2554 21.5002 8.74589 20.2064 8.12878 17.8261L8.14798 17.9H6.23682C4.74886 17.9 3.77132 17.3977 3.33464 16.4894C3.14368 16.0922 3.09998 15.7698 3.09998 15.3272C3.09998 14.3107 3.52785 13.6789 4.6091 12.5823C4.74817 12.4415 4.81184 12.3768 4.87946 12.307C5.40673 11.763 5.59998 11.4599 5.59998 11.2312V9.63156C5.59998 5.37994 8.48769 2.09998 12.5041 2.09998ZM14.9659 17.9018H10.034C10.49 19.1485 11.2758 19.7002 12.5 19.7002C13.7242 19.7002 14.51 19.1485 14.9659 17.9018ZM12.5041 3.89998C9.53644 3.89998 7.39998 6.32665 7.39998 9.63156V11.2312C7.39998 12.0838 7.01053 12.6946 6.17198 13.5598C6.09872 13.6354 6.02956 13.7056 5.89086 13.8461C5.14397 14.6036 4.89998 14.9639 4.89998 15.3272C4.89998 15.5193 4.91352 15.6192 4.9569 15.7094C5.0642 15.9326 5.38988 16.1 6.23682 16.1H18.7631C19.5832 16.1 19.9165 15.9315 20.0352 15.7032C20.0846 15.6081 20.1 15.5055 20.1 15.3272C20.1 14.9639 19.856 14.6036 19.1091 13.8461C18.9704 13.7056 18.9012 13.6354 18.828 13.5598C17.9894 12.6946 17.6 12.0838 17.6 11.2312V9.63156C17.6 6.32433 15.4697 3.89998 12.5041 3.89998Z" fill="#0A0A0A"/>
              </svg>
              <span>{{ $t('notice') }}</span>
            </a>
          </li>
          <li>
            <a class="header-tools-btn" @click="goToProfile">
              <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.4999 1.71423C18.1806 1.71423 22.7857 6.3193 22.7857 11.9999C22.7857 17.6806 18.1806 22.2857 12.4999 22.2857C6.8193 22.2857 2.21423 17.6806 2.21423 11.9999C2.21423 6.3193 6.8193 1.71423 12.4999 1.71423ZM12.4999 17.5714C10.712 17.5714 9.00284 18.0702 7.53127 18.9848C8.93267 19.9839 10.6477 20.5714 12.4999 20.5714C14.3518 20.5714 16.0665 19.9841 17.468 18.9856C15.9966 18.0701 14.2877 17.5714 12.4999 17.5714ZM12.4999 3.42852C7.76608 3.42852 3.92852 7.26608 3.92852 11.9999C3.92852 14.242 4.78931 16.2829 6.19843 17.8104C8.03048 16.5498 10.2122 15.8571 12.4999 15.8571C14.7879 15.8571 16.9699 16.55 18.8022 17.8092C20.2109 16.2822 21.0714 14.2415 21.0714 11.9999C21.0714 7.26608 17.2338 3.42852 12.4999 3.42852ZM12.4999 6.42852C14.7492 6.42852 16.5714 8.25067 16.5714 10.4999C16.5714 12.7492 14.7492 14.5714 12.4999 14.5714C10.2507 14.5714 8.42852 12.7492 8.42852 10.4999C8.42852 8.25067 10.2507 6.42852 12.4999 6.42852ZM12.4999 8.1428C11.1974 8.1428 10.1428 9.19744 10.1428 10.4999C10.1428 11.8025 11.1974 12.8571 12.4999 12.8571C13.8025 12.8571 14.8571 11.8025 14.8571 10.4999C14.8571 9.19744 13.8025 8.1428 12.4999 8.1428Z" fill="#0A0A0A"/>
              </svg>
              <span>{{ $t('profile') }}</span>
            </a>
          </li>
        </ul>
        <app-dropdown class="switch-lang">
          <template #base>
            <button class="switch-lang-btn"> {{ $t('language') }}  </button>
          </template>
          <template #dropdown="{ handleShow }">
            <div class="lang-list">
              <!--класс "active" добавляет чекмарк-->
              <div
                  v-for="(item, itemIdx) in languages"
                  :key="itemIdx"
                  class="lang-list-item"
                  @click="handleSelectLang(item.code, handleShow)"
              >
                {{ item.name }}
              </div>
            </div>
          </template>
        </app-dropdown>
      </div>
    </div>
    <div class="nav-menu" :class="{show: isMenu}" v-click-outside="hideMenu">
      <div class="container">
        <div class="nav-menu-row">
          <div class="nav-menu-column">
            <a href="" class="nav-menu-link" @click.prevent="handleGo('TheFilterVehicle')"> {{ $t('specialequipment') }} </a>
            <a href="" class="nav-menu-link" @click.prevent="handleGo('TheFilterOrder')">{{ $t('orders') }}</a>
            <a href="" class="nav-menu-link" @click.prevent="handleGo('TheFilterService')">{{ $t('services') }}</a>
            <a href="" class="nav-menu-link" @click.prevent="handleGo('TheFilterRepair')">  {{ $t('remont') }} </a>
          </div>
          <div class="nav-menu-column">
            <a href="" class="nav-menu-link" @click.prevent="handleGo('TheFilterShop')"> {{ $t('shop') }} </a>
            <a href="" class="nav-menu-link" @click.prevent="handleGo('TheFilterOperator')">{{ $t('operator') }}<span style="background: #E64646;">{{ $t('new') }}</span></a>
            <a href="" class="nav-menu-link disabled">{{ $t('Logistics') }}<span style="background: #2787F5;">{{ $t('soon') }}</span>
            </a>
          </div>
          <div class="nav-menu-column">
            <a href="" class="nav-menu-link-xs"> {{ $t('soon') }}</a>
            <a href="" class="nav-menu-link-xs">{{ $t('faq') }}</a>
            <a href="" class="nav-menu-link-xs">{{ $t('contacts') }}</a>
            <a href="" class="nav-menu-link-xs">{{ $t('terms_of_use') }}</a>
          </div>
          <div class="app-link-wrapper">
            <a href="https://apps.apple.com/kz/app/gservice/id1627674303" class="app-link" target="_blank">
              <img src="@/assets/img/main/app-store.png" alt="">
            </a>
            <a href="https://play.google.com/store/apps/details?id=com.gservice&pli=1" class="app-link" target="_blank">
              <img src="@/assets/img/main/google-play.png" alt="">
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="aside" :class="{show: isAside.length}" v-click-outside="hideAside">
      <div class="aside-header">
        <button class="btn-plain close-aside" @click="hideAside">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.2559 4.74408C18.9305 4.41864 18.4028 4.41864 18.0774 4.74408L12 10.822L5.92259 4.74408C5.59715 4.41864 5.06951 4.41864 4.74408 4.74408C4.44034 5.04782 4.42009 5.5277 4.68333 5.85493L4.74408 5.92259L10.822 12L4.74408 18.0774L4.68333 18.1451C4.42009 18.4723 4.44034 18.9522 4.74408 19.2559C5.06951 19.5814 5.59715 19.5814 5.92259 19.2559L12 13.178L18.0774 19.2559C18.4028 19.5814 18.9305 19.5814 19.2559 19.2559C19.5597 18.9522 19.5799 18.4723 19.3167 18.1451L19.2559 18.0774L13.178 12L19.2559 5.92259L19.3167 5.85493C19.5799 5.5277 19.5597 5.04782 19.2559 4.74408Z" fill="#99A2AD"/>
          </svg>
        </button>
        <p v-if="isAside === 'favourite'">   {{ $t('favourite') }}</p>
        <p v-else-if="isAside === 'notification'"> {{ $t('notification') }}</p>
      </div>
      <div class="aside-body">
        <template v-if="isAside === 'favourite'">
          <div class="aside-container">
            <div class="aside-filter">
              <span class="aside-filter-title">{{ $t('show') }}:</span>
              <app-dropdown class="aside-filter-dropdown">
                <template #base>
                  <button class="aside-filter-toggle">{{ $t('specialequipment') }}</button>
                </template>
                <template #dropdown="{ handleShow }">
                  <div class="aside-filter-menu">
                    <!--класс "active" меняет цвет-->
                    <div
                        v-for="(item, itemIdx) in favouriteOptions"
                        :key="itemIdx"
                        class="aside-filter-item"
                        @click="handleSelectFavourite(item, handleShow)"
                    >
                      {{ $t(item.name) }}
                    </div>
                  </div>
                </template>
              </app-dropdown>
            </div>
            <div class="favourite-card-list">
              <template v-if="favouriteOption.value === 'vehicle'">
                <app-card
                    v-for="item in favVehicles"
                    :key="item.id"
                    :item="item"
                    @link="hideAside"
                    @handleLike="handleLike"
                />
                <app-empty-container
                    v-if="!favVehicles.length"
                    img="favorite-lg"
                    :title="$t('do_not_have_favourite')"
                    :text="$t('your_favourites_appear_here')"
                ></app-empty-container>
              </template>
              <template v-if="favouriteOption.value === 'order'">
                <app-order-card
                    v-for="item in favOrders"
                    :key="item.id"
                    :item="item"
                    @link="hideAside"
                    @handleLike="handleLike"
                />
                <app-empty-container
                    v-if="!favOrders.length"
                    img="favorite-lg"
                    :title="$t('do_not_have_favourite')"
                    :text="$t('your_favourites_appear_here')"
                ></app-empty-container>
              </template>
              <template v-if="favouriteOption.value === 'service'">
                <app-service-card
                    v-for="item in favServices"
                    :key="item.id"
                    :item="item"
                    @link="hideAside"
                    @handleLike="handleLike"
                />
                <app-empty-container
                    v-if="!favServices.length"
                    img="favorite-lg"
                    :title="$t('do_not_have_favourite')"
                    :text="$t('your_favourites_appear_here')"
                ></app-empty-container>
              </template>
              <template v-if="favouriteOption.value === 'shop'">
                <app-shop-card
                    v-for="item in favShops"
                    :key="item.id"
                    :item="item"
                    @link="hideAside"
                    @handleLike="handleLike"
                />
                <app-empty-container
                    v-if="!favShops.length"
                    img="favorite-lg"
                    :title="$t('do_not_have_favourite')"
                    :text="$t('your_favourites_appear_here')"
                ></app-empty-container>
              </template>
              <template v-if="favouriteOption.value === 'repair'">
                <app-repair-card
                    v-for="item in favRepairs"
                    :key="item.id"
                    :item="item"
                    @link="hideAside"
                    @handleLike="handleLike"
                />
                <app-empty-container
                    v-if="!favRepairs.length"
                    img="favorite-lg"
                    :title="$t('do_not_have_favourite')"
                    :text="$t('your_favourites_appear_here')"
                ></app-empty-container>
              </template>
              <template v-if="favouriteOption.value === 'operator'">
                <app-operator-card
                    v-for="item in favOperators"
                    :key="item.id"
                    :item="item"
                    @link="hideAside"
                    @handleLike="handleLike"
                />
                <app-empty-container
                    v-if="!favOperators.length"
                    img="favorite-lg"
                    :title="$t('do_not_have_favourite')"
                    :text="$t('your_favourites_appear_here')"
                ></app-empty-container>
              </template>
            </div>
          </div>
        </template>
        <template v-else-if="isAside === 'notification'">
          <div class="notification-list" v-if="notifications.length">
            <app-notification
                v-for="(item, itemIdx) in notifications"
                :key="itemIdx"
                :item="item"
            />
          </div>
          <app-empty-container
              v-else
              img="notify-lg"
              :title="$t('you_dont_have_notifications') "
              :text="  $t('all_your_notifications_will_appear_here') "
          ></app-empty-container>
        </template>
      </div>
    </div>
    <div class="search-page" v-if="isSearch">
      <div class="container">
        <div class="product-wrapper">
          <div class="product-container">
            <div class="product-container-top">
              <a class="product-back-link" @click="hideSearch">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.0405 4.29289C12.431 4.68342 12.431 5.31658 12.0405 5.70711L7.08075 10.6667H19.3334C19.8857 10.6667 20.3334 11.1144 20.3334 11.6667C20.3334 12.219 19.8857 12.6667 19.3334 12.6667H7.08075L12.0406 17.627C12.4311 18.0175 12.431 18.6507 12.0405 19.0412C11.6499 19.4317 11.0168 19.4316 10.6263 19.0411L3.9596 12.3737L3.94646 12.3603C3.93213 12.3455 3.91826 12.3302 3.90487 12.3144L3.9596 12.3737C3.93197 12.3461 3.90629 12.3173 3.88257 12.2874C3.87063 12.2722 3.8589 12.2565 3.84763 12.2404C3.83934 12.2288 3.83167 12.2173 3.82426 12.2058C3.81635 12.1933 3.80837 12.1802 3.80069 12.1669C3.79217 12.1524 3.78425 12.1378 3.77671 12.1231C3.7064 11.9861 3.66675 11.831 3.66675 11.6667C3.66675 11.5023 3.7064 11.3472 3.77667 11.2104C3.78427 11.1955 3.7922 11.1809 3.80051 11.1665C3.80837 11.1531 3.81635 11.14 3.82462 11.1272C3.8317 11.116 3.83937 11.1045 3.8473 11.0932C3.8589 11.0768 3.87063 11.0611 3.8828 11.0458C3.88979 11.0369 3.89715 11.0279 3.90469 11.0191C3.91826 11.0032 3.93213 10.9879 3.94646 10.973C3.9507 10.9686 3.95515 10.9641 3.95964 10.9596L10.6263 4.29289C11.0168 3.90237 11.65 3.90237 12.0405 4.29289Z" fill="#6D7885"/>
                </svg>
                <span>{{$t('back') }}</span>
              </a>
            </div>
            <div class="product-container-content">
              <div class="search-container" :class="{empty: searchList.length === 0}">
                <div class="search-result-list" v-if="searchList.length">
                  <div class="search-result-item" v-for="(item, itemIdx) in orderList" :key="'a' + itemIdx">
                    <div class="search-result-img">
                      <img :src="item.image" alt="">
                    </div>
                    <div class="search-result-caption">
                      <div class="search-result-caption-left">
                        <div class="search-result-name" v-if="item.title">{{ item.title }}</div>
                        <div class="search-result-primary" v-if="item.subtitle">{{ item.subtitle }}</div>
                        <!--                        <div class="search-result-secondary">Тип топливо: Бензин</div>-->
                        <!--                        <div class="search-result-secondary">Категория: Самосвал</div>-->
                        <!--                        <div class="search-result-additional">17.01.2023</div>-->
                      </div>
                      <!--                      <div class="search-result-caption-right">-->
                      <!--                        <div class="search-result-favourite">-->
                      <!--                          <input type="checkbox">-->
                      <!--                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">-->
                      <!--                            <path d="M11.472 6.35156L11.9942 6.85764L12.5162 6.35137L12.6283 6.24259C13.6335 5.30315 14.7642 4.81257 16.0167 4.75562L16.2735 4.75001C19.0158 4.75428 21.25 6.98001 21.25 9.71723C21.25 11.0822 21.0183 12.0296 20.2988 13.067C19.5425 14.1577 18.2309 15.3726 15.9595 17.1919C15.959 17.1923 15.9585 17.1927 15.958 17.193L15.0303 17.9284L12.6685 19.7692C12.2755 20.0755 11.7245 20.0755 11.3315 19.7692L8.6474 17.6746C8.64681 17.6741 8.64621 17.6736 8.64562 17.6731C6.11076 15.6702 4.64578 14.3643 3.80125 13.2078C3.0001 12.1107 2.75 11.1371 2.75 9.71723C2.75 6.97738 4.98847 4.75 7.73438 4.75C9.06566 4.75 10.2738 5.2405 11.3567 6.23981L11.472 6.35156Z" stroke="#99A2AD" stroke-width="1.5"/>-->
                      <!--                          </svg>-->
                      <!--                        </div>-->
                      <!--                        <div class="search-result-price">125 000〒</div>-->
                      <!--                      </div>-->
                    </div>
                    <a class="absolute-link" @click.prevent="goToSearchDetail('TheOrderDetail', item.id)"></a>
                  </div>
                  <div class="search-result-item" v-for="(item, itemIdx) in repairList" :key="'b' + itemIdx">
                    <div class="search-result-img">
                      <img :src="item.image" alt="">
                    </div>
                    <div class="search-result-caption">
                      <div class="search-result-caption-left">
                        <div class="search-result-name" v-if="item.title">{{ item.title }}</div>
                        <div class="search-result-primary" v-if="item.subtitle">{{ item.subtitle }}</div>
                        <!--                        <div class="search-result-secondary">Тип топливо: Бензин</div>-->
                        <!--                        <div class="search-result-secondary">Категория: Самосвал</div>-->
                        <!--                        <div class="search-result-additional">17.01.2023</div>-->
                      </div>
                      <!--                      <div class="search-result-caption-right">-->
                      <!--                        <div class="search-result-favourite">-->
                      <!--                          <input type="checkbox">-->
                      <!--                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">-->
                      <!--                            <path d="M11.472 6.35156L11.9942 6.85764L12.5162 6.35137L12.6283 6.24259C13.6335 5.30315 14.7642 4.81257 16.0167 4.75562L16.2735 4.75001C19.0158 4.75428 21.25 6.98001 21.25 9.71723C21.25 11.0822 21.0183 12.0296 20.2988 13.067C19.5425 14.1577 18.2309 15.3726 15.9595 17.1919C15.959 17.1923 15.9585 17.1927 15.958 17.193L15.0303 17.9284L12.6685 19.7692C12.2755 20.0755 11.7245 20.0755 11.3315 19.7692L8.6474 17.6746C8.64681 17.6741 8.64621 17.6736 8.64562 17.6731C6.11076 15.6702 4.64578 14.3643 3.80125 13.2078C3.0001 12.1107 2.75 11.1371 2.75 9.71723C2.75 6.97738 4.98847 4.75 7.73438 4.75C9.06566 4.75 10.2738 5.2405 11.3567 6.23981L11.472 6.35156Z" stroke="#99A2AD" stroke-width="1.5"/>-->
                      <!--                          </svg>-->
                      <!--                        </div>-->
                      <!--                        <div class="search-result-price">125 000〒</div>-->
                      <!--                      </div>-->
                    </div>
                    <a class="absolute-link" @click.prevent="goToSearchDetail('TheRepairDetail', item.id)"></a>
                  </div>
                  <div class="search-result-item" v-for="(item, itemIdx) in vehicleList" :key="'c' + itemIdx">
                    <div class="search-result-img">
                      <img :src="item.image" alt="">
                    </div>
                    <div class="search-result-caption">
                      <div class="search-result-caption-left">
                        <div class="search-result-name" v-if="item.title">{{ item.title }}</div>
                        <div class="search-result-primary" v-if="item.subtitle">{{ item.subtitle }}</div>
                        <!--                        <div class="search-result-secondary">Тип топливо: Бензин</div>-->
                        <!--                        <div class="search-result-secondary">Категория: Самосвал</div>-->
                        <!--                        <div class="search-result-additional">17.01.2023</div>-->
                      </div>
                      <!--                      <div class="search-result-caption-right">-->
                      <!--                        <div class="search-result-favourite">-->
                      <!--                          <input type="checkbox">-->
                      <!--                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">-->
                      <!--                            <path d="M11.472 6.35156L11.9942 6.85764L12.5162 6.35137L12.6283 6.24259C13.6335 5.30315 14.7642 4.81257 16.0167 4.75562L16.2735 4.75001C19.0158 4.75428 21.25 6.98001 21.25 9.71723C21.25 11.0822 21.0183 12.0296 20.2988 13.067C19.5425 14.1577 18.2309 15.3726 15.9595 17.1919C15.959 17.1923 15.9585 17.1927 15.958 17.193L15.0303 17.9284L12.6685 19.7692C12.2755 20.0755 11.7245 20.0755 11.3315 19.7692L8.6474 17.6746C8.64681 17.6741 8.64621 17.6736 8.64562 17.6731C6.11076 15.6702 4.64578 14.3643 3.80125 13.2078C3.0001 12.1107 2.75 11.1371 2.75 9.71723C2.75 6.97738 4.98847 4.75 7.73438 4.75C9.06566 4.75 10.2738 5.2405 11.3567 6.23981L11.472 6.35156Z" stroke="#99A2AD" stroke-width="1.5"/>-->
                      <!--                          </svg>-->
                      <!--                        </div>-->
                      <!--                        <div class="search-result-price">125 000〒</div>-->
                      <!--                      </div>-->
                    </div>
                    <a class="absolute-link" @click.prevent="goToSearchDetail('TheVehicleDetail', item.id)"></a>
                  </div>
                  <div class="search-result-item" v-for="(item, itemIdx) in shopList" :key="'d' + itemIdx">
                    <div class="search-result-img">
                      <img :src="item.image" alt="">
                    </div>
                    <div class="search-result-caption">
                      <div class="search-result-caption-left">
                        <div class="search-result-name" v-if="item.title">{{ item.title }}</div>
                        <div class="search-result-primary" v-if="item.subtitle">{{ item.subtitle }}</div>
                        <!--                        <div class="search-result-secondary">Тип топливо: Бензин</div>-->
                        <!--                        <div class="search-result-secondary">Категория: Самосвал</div>-->
                        <!--                        <div class="search-result-additional">17.01.2023</div>-->
                      </div>
                      <!--                      <div class="search-result-caption-right">-->
                      <!--                        <div class="search-result-favourite">-->
                      <!--                          <input type="checkbox">-->
                      <!--                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">-->
                      <!--                            <path d="M11.472 6.35156L11.9942 6.85764L12.5162 6.35137L12.6283 6.24259C13.6335 5.30315 14.7642 4.81257 16.0167 4.75562L16.2735 4.75001C19.0158 4.75428 21.25 6.98001 21.25 9.71723C21.25 11.0822 21.0183 12.0296 20.2988 13.067C19.5425 14.1577 18.2309 15.3726 15.9595 17.1919C15.959 17.1923 15.9585 17.1927 15.958 17.193L15.0303 17.9284L12.6685 19.7692C12.2755 20.0755 11.7245 20.0755 11.3315 19.7692L8.6474 17.6746C8.64681 17.6741 8.64621 17.6736 8.64562 17.6731C6.11076 15.6702 4.64578 14.3643 3.80125 13.2078C3.0001 12.1107 2.75 11.1371 2.75 9.71723C2.75 6.97738 4.98847 4.75 7.73438 4.75C9.06566 4.75 10.2738 5.2405 11.3567 6.23981L11.472 6.35156Z" stroke="#99A2AD" stroke-width="1.5"/>-->
                      <!--                          </svg>-->
                      <!--                        </div>-->
                      <!--                        <div class="search-result-price">125 000〒</div>-->
                      <!--                      </div>-->
                    </div>
                    <a class="absolute-link" @click.prevent="goToSearchDetail('TheShopDetail', item.id)"></a>
                  </div>
                  <div class="search-result-item" v-for="(item, itemIdx) in serviceList" :key="'e' + itemIdx">
                    <div class="search-result-img">
                      <img :src="item.image" alt="">
                    </div>
                    <div class="search-result-caption">
                      <div class="search-result-caption-left">
                        <div class="search-result-name" v-if="item.title">{{ item.title }}</div>
                        <div class="search-result-primary" v-if="item.subtitle">{{ item.subtitle }}</div>
                        <!--                        <div class="search-result-secondary">Тип топливо: Бензин</div>-->
                        <!--                        <div class="search-result-secondary">Категория: Самосвал</div>-->
                        <!--                        <div class="search-result-additional">17.01.2023</div>-->
                      </div>
                      <!--                      <div class="search-result-caption-right">-->
                      <!--                        <div class="search-result-favourite">-->
                      <!--                          <input type="checkbox">-->
                      <!--                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">-->
                      <!--                            <path d="M11.472 6.35156L11.9942 6.85764L12.5162 6.35137L12.6283 6.24259C13.6335 5.30315 14.7642 4.81257 16.0167 4.75562L16.2735 4.75001C19.0158 4.75428 21.25 6.98001 21.25 9.71723C21.25 11.0822 21.0183 12.0296 20.2988 13.067C19.5425 14.1577 18.2309 15.3726 15.9595 17.1919C15.959 17.1923 15.9585 17.1927 15.958 17.193L15.0303 17.9284L12.6685 19.7692C12.2755 20.0755 11.7245 20.0755 11.3315 19.7692L8.6474 17.6746C8.64681 17.6741 8.64621 17.6736 8.64562 17.6731C6.11076 15.6702 4.64578 14.3643 3.80125 13.2078C3.0001 12.1107 2.75 11.1371 2.75 9.71723C2.75 6.97738 4.98847 4.75 7.73438 4.75C9.06566 4.75 10.2738 5.2405 11.3567 6.23981L11.472 6.35156Z" stroke="#99A2AD" stroke-width="1.5"/>-->
                      <!--                          </svg>-->
                      <!--                        </div>-->
                      <!--                        <div class="search-result-price">125 000〒</div>-->
                      <!--                      </div>-->
                    </div>
                    <a class="absolute-link" @click.prevent="goToSearchDetail('TheServiceDetail', item.id)"></a>
                  </div>
                  <div class="search-result-item" v-for="(item, itemIdx) in operatorList" :key="'f' + itemIdx">
                    <div class="search-result-img">
                      <img :src="item.image" alt="">
                    </div>
                    <div class="search-result-caption">
                      <div class="search-result-caption-left">
                        <div class="search-result-name" v-if="item.title">{{ item.title }}</div>
                        <div class="search-result-primary" v-if="item.subtitle">{{ item.subtitle }}</div>
                        <!--                        <div class="search-result-secondary">Тип топливо: Бензин</div>-->
                        <!--                        <div class="search-result-secondary">Категория: Самосвал</div>-->
                        <!--                        <div class="search-result-additional">17.01.2023</div>-->
                      </div>
                      <!--                      <div class="search-result-caption-right">-->
                      <!--                        <div class="search-result-favourite">-->
                      <!--                          <input type="checkbox">-->
                      <!--                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">-->
                      <!--                            <path d="M11.472 6.35156L11.9942 6.85764L12.5162 6.35137L12.6283 6.24259C13.6335 5.30315 14.7642 4.81257 16.0167 4.75562L16.2735 4.75001C19.0158 4.75428 21.25 6.98001 21.25 9.71723C21.25 11.0822 21.0183 12.0296 20.2988 13.067C19.5425 14.1577 18.2309 15.3726 15.9595 17.1919C15.959 17.1923 15.9585 17.1927 15.958 17.193L15.0303 17.9284L12.6685 19.7692C12.2755 20.0755 11.7245 20.0755 11.3315 19.7692L8.6474 17.6746C8.64681 17.6741 8.64621 17.6736 8.64562 17.6731C6.11076 15.6702 4.64578 14.3643 3.80125 13.2078C3.0001 12.1107 2.75 11.1371 2.75 9.71723C2.75 6.97738 4.98847 4.75 7.73438 4.75C9.06566 4.75 10.2738 5.2405 11.3567 6.23981L11.472 6.35156Z" stroke="#99A2AD" stroke-width="1.5"/>-->
                      <!--                          </svg>-->
                      <!--                        </div>-->
                      <!--                        <div class="search-result-price">125 000〒</div>-->
                      <!--                      </div>-->
                    </div>
                    <a class="absolute-link" @click.prevent="goToSearchDetail('TheOperatorDetail', item.id)"></a>
                  </div>
                </div>
                <app-empty-container
                    v-else
                    img="loup-lg"
                    :title="$t('no_result')"
                    :text="$t('try_search_other')"
                ></app-empty-container>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppDropdown from "@/components/AppDropdown";
import {mapMutations} from 'vuex';
import AppEmptyContainer from "@/components/AppEmptyContainer";
import AppNotification from "@/components/AppNotification";
import API from "@/api";
import AppCard from "@/components/AppProductCards/AppCard";
import AppOrderCard from "@/components/AppProductCards/AppOrderCard";
import AppServiceCard from "@/components/AppProductCards/AppServiceCard";
import AppShopCard from "@/components/AppProductCards/AppShopCard";
import AppRepairCard from "@/components/AppProductCards/AppRepairCard";
import AppOperatorCard from "@/components/AppProductCards/AppOperatorCard";

export default {
  name: "TheHeader",

  components: {
    AppDropdown,
    AppEmptyContainer,
    AppNotification,
    AppCard,
    AppOrderCard,
    AppServiceCard,
    AppShopCard,
    AppRepairCard,
    AppOperatorCard,
  },

  data() {
    return {
      isMenu: false,
      isSearch: false,
      isAside: '',
      favouriteList: [],
      notifications: [],
      searchList: [],
      search: '',
      orderList: [],
      repairList: [],
      vehicleList: [],
      shopList: [],
      serviceList: [],
      operatorList: [],
      favVehicles: [],
      favOrders: [],
      favServices: [],
      favShops: [],
      favRepairs: [],
      favOperators: [],
      favouriteOption: {
        name: 'specialequipment',
        value: 'vehicle'
      },
      favouriteOptions: [
        {
          name: 'specialequipment',
          value: 'vehicle'
        },
        {
          name: 'orders',
          value: 'order'
        },
        {
          name: 'services',
          value: 'service'
        },
        {
          name: 'shop',
          value: 'shop'
        },
        {
          name: 'remont',
          value: 'repair'
        },
        {
          name: 'operator',
          value: 'operator'
        },
      ],
      languages: [
        { name: 'Қазақша', code: 'kk'},
        { name: 'Русский', code: 'ru'},
        { name: 'English', code: 'en'},
      ]
    }
  },

  watch: {
    isMenu(old, val) {
      if (val) {
        document.body.classList.remove('scroll-locked');
      } else {
        document.body.classList.add('scroll-locked');
      }
    },
    isAside() {
      this.setShortOverlay(this.isAside);
      if (this.isAside.length) {
        document.body.classList.add('scroll-locked');
      } else {
        document.body.classList.remove('scroll-locked');
      }
    },
    search() {
      this.isSearch = !!this.search.length;
    },
    isSearch(old, val) {
      if (val) {
        document.body.classList.remove('scroll-locked');
      } else {
        document.body.classList.add('scroll-locked');
      }
    }
  },

  methods: {
    ...mapMutations([
      'setShortOverlay','setLocale'
    ]),
    goToMain() {
      this.hideSearch();
      if (this.$route.name !== 'TheHome') {
        this.$router.push({name: 'TheHome'})
      }
    },
    toggleMenu(event) {
      event.stopPropagation()
      this.isMenu = !this.isMenu;
      this.setShortOverlay(this.isMenu);
      this.hideSearch();
    },
    handleSelectLang(locale, callback) {
      this.$i18n.locale = locale;
      this.setLocale(locale);
      callback();
    },
    handleGo(name) {
      this.$router.push({name: name});
      this.hideMenu();
    },
    hideMenu() {
      if (this.isMenu) {
        this.isMenu = false;
        this.setShortOverlay(this.isMenu);
      }
    },
    toggleAside(name) {
      this.hideSearch();
      if(this.$store.getters.loggedIn) {
        this.isAside = name;
        this.fetchNotifications();
        this.fetchFavVehicle();
        this.fetchFavOrder();
        this.fetchFavService();
        this.fetchFavShop();
        this.fetchFavRepair();
        this.fetchFavOperator();
      } else {
        this.$notify({
          text: this.$t('need_to_authorize'),
        })
      }
    },
    hideAside() {
      this.isAside = '';
    },
    fetchNotifications() {
      API.notification.notification.getList().then((res) => {
        this.notifications = res.notifications;
      })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            // this.$store.commit("SET_LOADER", false);
          });
    },
    handleSearch() {
      const params = {
        search: this.search
      }
      API.search.getList({params})
          .then((res) => {
            this.searchList = [];
            Object.values(res.data).forEach(item => item.forEach(item => {
              this.searchList.push(item)
            }));
            this.orderList = res.data.orders;
            this.repairList = res.data.repairmens;
            this.vehicleList = res.data.sale_vehicle;
            this.shopList = res.data.shop_items;
            this.serviceList = res.data.vehicles;
            this.operatorList = res.data.driver_applications;
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            // this.$store.commit("SET_LOADER", false);
          });
    },
    goToSearchDetail(name, id) {
      this.hideSearch();
      this.$router.push({name: name, params: {id: id}});
    },
    hideSearch() {
      this.isSearch = false;
      this.search = ''
    },
    fetchFavVehicle() {
      const params = {
        type: 'App\\Models\\SaleVehicle'
      }
      API.favourite.favourites.getList({params}).then((res) => {
        this.favVehicles = res.favourites
      })
    },
    fetchFavOrder() {
      const params = {
        type: 'App\\Models\\Order'
      }
      API.favourite.favourites.getList({params}).then((res) => {
        this.favOrders = res.favourites
      })
    },
    fetchFavService() {
      const params = {
        type: 'App\\Models\\Vehicle'
      }
      API.favourite.favourites.getList({params}).then((res) => {
        this.favServices = res.favourites
      })
    },
    fetchFavShop() {
      const params = {
        type: 'App\\Models\\ShopItem'
      }
      API.favourite.favourites.getList({params}).then((res) => {
        this.favShops = res.favourites
      })
    },
    fetchFavRepair() {
      const params = {
        type: 'App\\Models\\Repairmen'
      }
      API.favourite.favourites.getList({params}).then((res) => {
        this.favRepairs = res.favourites
      })
    },
    fetchFavOperator() {
      const params = {
        type: 'App\\Models\\DriverApplication'
      }
      API.favourite.favourites.getList({params}).then((res) => {
        this.favOperators = res.favourites
      })
    },
    handleSelectFavourite(item, callback) {
      callback();
      this.favouriteOption = item
    },
    goToProfile() {
      this.hideSearch();
      if (this.$store.getters.loggedIn) {
        this.$router.push({name: 'TheProfileEdit'})
      } else {
        this.$router.push({name: 'TheLogin'})
      }
    },
    async handleLike(item, url) {
      const formData = new FormData();
      formData.append("id", item.id);
      formData.append("type", url);
      await API.favorite.remove(formData).then(() => {
        switch(url) {
          case 'App\\Models\\SaleVehicle':
            this.fetchFavVehicle();
            break;
          case 'App\\Models\\Order':
            this.fetchFavOrder();
            break;
          case 'App\\Models\\Vehicle':
            this.fetchFavService();
            break;
          case 'App\\Models\\ShopItem':
            this.fetchFavShop();
            break;
          case 'App\\Models\\Repairmen':
            this.fetchFavRepair();
            break;
          case 'App\\Models\\DriverApplication':
            this.fetchFavOperator();
            break;
        }
      });
    }
  }
}

</script>

<style scoped>

</style>

