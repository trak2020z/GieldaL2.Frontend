'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">gielda-l2-frontend documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/OfferModule.html" data-type="entity-link">OfferModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-OfferModule-d931a232a59ec5fa8c8eca727b25a01b"' : 'data-target="#xs-components-links-module-OfferModule-d931a232a59ec5fa8c8eca727b25a01b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-OfferModule-d931a232a59ec5fa8c8eca727b25a01b"' :
                                            'id="xs-components-links-module-OfferModule-d931a232a59ec5fa8c8eca727b25a01b"' }>
                                            <li class="link">
                                                <a href="components/CreateBuyOfferComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CreateBuyOfferComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CreateSellOfferComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CreateSellOfferComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OfferMainComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OfferMainComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/OfferRoutingModule.html" data-type="entity-link">OfferRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/RootModule.html" data-type="entity-link">RootModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-RootModule-be0a79b27af1f576aa7e76f36329fdb1"' : 'data-target="#xs-components-links-module-RootModule-be0a79b27af1f576aa7e76f36329fdb1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RootModule-be0a79b27af1f576aa7e76f36329fdb1"' :
                                            'id="xs-components-links-module-RootModule-be0a79b27af1f576aa7e76f36329fdb1"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginFormComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavHeaderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NavHeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegisterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RegisterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StaticSidebarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">StaticSidebarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StockComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">StockComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TableUpdateTimeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TableUpdateTimeComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-RootModule-be0a79b27af1f576aa7e76f36329fdb1"' : 'data-target="#xs-injectables-links-module-RootModule-be0a79b27af1f576aa7e76f36329fdb1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RootModule-be0a79b27af1f576aa7e76f36329fdb1"' :
                                        'id="xs-injectables-links-module-RootModule-be0a79b27af1f576aa7e76f36329fdb1"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TokenStorage.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>TokenStorage</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RootRoutingModule.html" data-type="entity-link">RootRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link">SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SharedModule-98f6d129510b438245be48b00afc56ba"' : 'data-target="#xs-components-links-module-SharedModule-98f6d129510b438245be48b00afc56ba"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-98f6d129510b438245be48b00afc56ba"' :
                                            'id="xs-components-links-module-SharedModule-98f6d129510b438245be48b00afc56ba"' }>
                                            <li class="link">
                                                <a href="components/ServiceStatusComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ServiceStatusComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link">UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-UserModule-d2c715736bff220df5eb369c172259ac"' : 'data-target="#xs-components-links-module-UserModule-d2c715736bff220df5eb369c172259ac"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UserModule-d2c715736bff220df5eb369c172259ac"' :
                                            'id="xs-components-links-module-UserModule-d2c715736bff220df5eb369c172259ac"' }>
                                            <li class="link">
                                                <a href="components/ConfirmDialogComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ConfirmDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MainComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MainComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserBuyOffersComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserBuyOffersComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserEditComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserEditComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserHistoryComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserHistoryComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserSellOffersComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserSellOffersComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserSharesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserSharesComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/userRoutingModule.html" data-type="entity-link">userRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/ApiResponse.html" data-type="entity-link">ApiResponse</a>
                            </li>
                            <li class="link">
                                <a href="classes/BuyOffer.html" data-type="entity-link">BuyOffer</a>
                            </li>
                            <li class="link">
                                <a href="classes/Context.html" data-type="entity-link">Context</a>
                            </li>
                            <li class="link">
                                <a href="classes/CrossFieldErrorMatcher.html" data-type="entity-link">CrossFieldErrorMatcher</a>
                            </li>
                            <li class="link">
                                <a href="classes/Offer.html" data-type="entity-link">Offer</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegisterModel.html" data-type="entity-link">RegisterModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/SaleOffer.html" data-type="entity-link">SaleOffer</a>
                            </li>
                            <li class="link">
                                <a href="classes/Share.html" data-type="entity-link">Share</a>
                            </li>
                            <li class="link">
                                <a href="classes/Stock.html" data-type="entity-link">Stock</a>
                            </li>
                            <li class="link">
                                <a href="classes/StockTableDataSource.html" data-type="entity-link">StockTableDataSource</a>
                            </li>
                            <li class="link">
                                <a href="classes/StockTableDataSource-1.html" data-type="entity-link">StockTableDataSource</a>
                            </li>
                            <li class="link">
                                <a href="classes/Transaction.html" data-type="entity-link">Transaction</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link">User</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserEdit.html" data-type="entity-link">UserEdit</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserHistoryDataElement.html" data-type="entity-link">UserHistoryDataElement</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserSaleDataElement.html" data-type="entity-link">UserSaleDataElement</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/ContextService.html" data-type="entity-link">ContextService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OffersService.html" data-type="entity-link">OffersService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RegisterService.html" data-type="entity-link">RegisterService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ShareService.html" data-type="entity-link">ShareService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StockService.html" data-type="entity-link">StockService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TransactionService.html" data-type="entity-link">TransactionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link">UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interceptors-links"' :
                            'data-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/Interceptor.html" data-type="entity-link">Interceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link">AuthGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});