# Projet DevOps - MaineCoon

## Contexte
Ce projet s'inscrit dans le cadre d'un cours de DevOps où nous avons abordé plusieurs technologies et pratiques modernes pour l'automatisation du déploiement et de la gestion d'infrastructure.

## Technologies utilisées

| Technologie  | Usage |
|---|---|
| Docker | Containerisation des services |
| Kubernetes | Orchestration des containers |
| Terraform | Provisioning de l’infrastructure |
| GitHub Actions | Pipeline CI/CD |

L'infrastructure a été provisionnée sur **DigitalOcean**.

## Architecture de l'application
> TODO

## Comment déployer le projet
> TODO

## Tâches réalisées

### Partie Dev.

#### > Création de l’API - **Warren/Hugo/Gabriel**
Nous avons développé une **API REST** permettant aux différents services et au client web de communiquer avec le backend. L’API expose plusieurs endpoints pour gérer les ressources de l’application.

#### > Mise en place des logs sur l’API - **Hugo**
Un système de **logging** a été intégré dans l’API afin de tracer les actions importantes (logs d’accès, erreurs, logs applicatifs). Ces logs facilitent le monitoring et le diagnostic en cas d’incident.

#### > Maquetage - **Hugo**
Avant de coder l’interface, nous avons conçu des **maquettes** pour le client web, afin de valider l’expérience utilisateur et le parcours de navigation.

#### > Développement du client web - **Hugo**
Le **client web** a ensuite été développé pour permettre aux utilisateurs finaux d’interagir avec l’application. Il consomme directement les endpoints de l’API et offre une interface utilisateur intuitive.

#### > Conteneurisation - **Warren**
Chaque composant de l’application a été **conteneurisé** à l’aide de **Docker**. Un Dockerfiles a été créé afin de garantir une image optimisée.

---

### Partie Ops.

#### > Mise en place de la base de données - **Axel**
La base de données a été déployée sur **DigitalOcean Managed Databases**. La configuration réseau, les accès, les sauvegardes et la sécurité ont été pris en compte.

#### > Déploiement Kubernetes - **Axel**
L’application conteneurisée a ensuite été déployée dans un cluster **DigitalOcean Kubernetes (DOKS)**. Chaque service dispose de son propre déploiement et service.

#### > Mise en place d’un runner GitHub - **Axel**
Pour exécuter certaines tâches lourdes (ex : déploiement, tests end-to-end), un **runner auto-hébergé** a été configuré. Cela permet de maîtriser l’environnement d’exécution et d’assurer une meilleure intégration avec notre infrastructure.

#### > Pipeline Terraform - **Gabriel**
L’ensemble de l’infrastructure a été défini dans des fichiers **Terraform**. Un **pipeline CI/CD** a été mis en place pour appliquer ces configurations automatiquement à chaque mise à jour.

#### > Pipeline Docker - **Gabriel**
Un pipeline de **build et de push** des images Docker a été mis en place. À chaque modification du code, l’image est automatiquement reconstruite puis poussée dans un **registre Docker** (Docker Hub, GHCR ou autre). Une pipeline **Terraform** a également été créée afin de mettre en place et de maintenir l'environnement.

#### > Gestion du tf.state - **Gabriel**
Le **state Terraform** est stocké dans un espace de stockage DigitalOcean. Cela garantit la persistance et la centralisation de l’état, facilitant le travail en équipe et évitant les conflits.

## Schéma de données

<div align="center">(images/schema-donnees.png)</div>

## Rendu de l'application

<div align="center">(images/index.png)</div>
